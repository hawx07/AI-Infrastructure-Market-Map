// AI Infrastructure Market Map - D3.js Force-Directed Graph
// Reliable visualization with full feature support

import { marketMapData, categoryColors } from './data.js';
import { fetchStockData } from './stock-api.js';
import { companyRelationships, sectorColors } from './relationships.js';

// State
let svg, g, simulation;
let nodes = [];
let links = [];
let nodeMap = new Map();
let activeCategory = null;
let zoom;

// Configuration
const config = {
    nodeRadius: {
        root: 30,
        category: 20,
        subcategory: 12,
        company: 8
    },
    linkDistance: 80,
    chargeStrength: -300,
    labelMinZoom: 0.5
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    processData();
    initVisualization();
    setupSearch();
    setupLegend();
    setupControls();
    document.getElementById('loading').style.display = 'none';
});

// ============================================
// Data Processing
// ============================================
function processData() {
    nodes = [];
    links = [];
    nodeMap.clear();

    let nodeIndex = 0;

    function traverse(node, parent = null, depth = 0, category = null) {
        const id = node.name;
        const cat = depth === 1 ? node.name : category;

        const nodeItem = {
            id: id,
            index: nodeIndex++,
            name: node.name,
            ticker: node.ticker || null,
            exchange: node.exchange || null,
            depth: depth,
            category: cat,
            isCompany: !!node.ticker,
            isRoot: depth === 0,
            isCategory: depth === 1,
            isSubcategory: depth === 2 && !node.ticker,
            color: categoryColors[cat] || '#64748b'
        };

        if (!nodeMap.has(id)) {
            nodes.push(nodeItem);
            nodeMap.set(id, nodeItem);
        }

        if (parent && nodeMap.has(parent)) {
            links.push({
                source: nodeMap.get(parent),
                target: nodeItem,
                type: 'hierarchy',
                color: 'rgba(100, 116, 139, 0.3)'
            });
        }

        if (node.children) {
            node.children.forEach(child => traverse(child, id, depth + 1, cat));
        }
    }

    traverse(marketMapData);

    // Add relationship links
    companyRelationships.forEach(rel => {
        const source = nodeMap.get(rel.source);
        const target = nodeMap.get(rel.target);

        if (source && target) {
            links.push({
                source: source,
                target: target,
                type: 'relationship',
                label: rel.label,
                value: rel.value,
                reason: rel.reason,
                sector: rel.sector,
                color: sectorColors[rel.sector] || '#888888'
            });
        }
    });

    console.log(`Processed ${nodes.length} nodes and ${links.length} links`);
}

// ============================================
// D3 Visualization
// ============================================
function initVisualization() {
    const container = document.getElementById('tree-container');
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Create SVG
    svg = d3.select('#tree-container')
        .append('svg')
        .attr('width', '100%')
        .attr('height', '100%')
        .attr('viewBox', [0, 0, width, height]);

    // Add zoom behavior
    zoom = d3.zoom()
        .scaleExtent([0.1, 4])
        .on('zoom', (event) => {
            g.attr('transform', event.transform);
            updateLabelsVisibility(event.transform.k);
        });

    svg.call(zoom);

    // Main group for zoom/pan
    g = svg.append('g');

    // Create links
    const linkGroup = g.append('g').attr('class', 'links');

    const link = linkGroup.selectAll('line')
        .data(links)
        .join('line')
        .attr('class', d => `link link-${d.type}`)
        .attr('stroke', d => d.color)
        .attr('stroke-width', d => d.type === 'relationship' ? 2 : 1)
        .attr('stroke-opacity', d => d.type === 'relationship' ? 0.7 : 0.3)
        .attr('stroke-dasharray', d => d.type === 'relationship' ? '5,3' : 'none');

    // Create nodes
    const nodeGroup = g.append('g').attr('class', 'nodes');

    const node = nodeGroup.selectAll('g')
        .data(nodes)
        .join('g')
        .attr('class', d => `node ${d.isCompany ? 'node-company' : 'node-category'}`)
        .style('cursor', 'pointer')
        .call(drag(simulation))
        .on('click', (event, d) => {
            event.stopPropagation();
            showNodeInfo(d);
        });

    // Node circles
    node.append('circle')
        .attr('r', d => getNodeRadius(d))
        .attr('fill', d => d.color)
        .attr('stroke', d => d.color)
        .attr('stroke-width', 2)
        .attr('stroke-opacity', 0.5)
        .style('filter', d => `drop-shadow(0 0 ${d.isCompany ? 4 : 8}px ${d.color})`);

    // Node labels
    node.append('text')
        .attr('class', 'node-label')
        .attr('dy', d => getNodeRadius(d) + 12)
        .attr('text-anchor', 'middle')
        .attr('fill', '#ffffff')
        .attr('font-size', d => d.isCompany ? '9px' : '11px')
        .attr('font-weight', d => d.isCompany ? '400' : '600')
        .text(d => {
            if (d.isRoot) return '';
            if (d.ticker) return d.ticker;
            if (d.name.length > 25) return d.name.substring(0, 22) + '...';
            return d.name;
        })
        .style('pointer-events', 'none')
        .style('text-shadow', '0 1px 3px rgba(0,0,0,0.8)');

    // Force simulation
    simulation = d3.forceSimulation(nodes)
        .force('link', d3.forceLink(links).id(d => d.id).distance(d => {
            if (d.type === 'relationship') return 150;
            return config.linkDistance + (d.source.depth * 20);
        }))
        .force('charge', d3.forceManyBody().strength(d => {
            if (d.isRoot) return -1000;
            if (d.isCategory) return -500;
            return config.chargeStrength;
        }))
        .force('center', d3.forceCenter(width / 2, height / 2))
        .force('collision', d3.forceCollide().radius(d => getNodeRadius(d) + 10));

    simulation.on('tick', () => {
        link
            .attr('x1', d => d.source.x)
            .attr('y1', d => d.source.y)
            .attr('x2', d => d.target.x)
            .attr('y2', d => d.target.y);

        node.attr('transform', d => `translate(${d.x},${d.y})`);
    });

    // Click on background to deselect
    svg.on('click', () => {
        hideNodeInfo();
    });

    // Initial fit
    setTimeout(() => {
        fitToView();
    }, 2000);
}

function getNodeRadius(d) {
    if (d.isRoot) return config.nodeRadius.root;
    if (d.isCategory) return config.nodeRadius.category;
    if (d.isSubcategory) return config.nodeRadius.subcategory;
    return config.nodeRadius.company;
}

function updateLabelsVisibility(scale) {
    g.selectAll('.node-label')
        .style('opacity', scale > config.labelMinZoom ? 1 : 0);
}

function drag(simulation) {
    function dragstarted(event, d) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
    }

    function dragged(event, d) {
        d.fx = event.x;
        d.fy = event.y;
    }

    function dragended(event, d) {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
    }

    return d3.drag()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended);
}

function fitToView() {
    const bounds = g.node().getBBox();
    const parent = svg.node().parentElement;
    const fullWidth = parent.clientWidth;
    const fullHeight = parent.clientHeight;
    const width = bounds.width;
    const height = bounds.height;
    const midX = bounds.x + width / 2;
    const midY = bounds.y + height / 2;

    const scale = 0.8 / Math.max(width / fullWidth, height / fullHeight);
    const translate = [fullWidth / 2 - scale * midX, fullHeight / 2 - scale * midY];

    svg.transition()
        .duration(750)
        .call(zoom.transform, d3.zoomIdentity.translate(translate[0], translate[1]).scale(scale));
}

// ============================================
// Category Filtering
// ============================================
function filterByCategory(category) {
    activeCategory = activeCategory === category ? null : category;

    g.selectAll('.node')
        .transition()
        .duration(300)
        .style('opacity', d => {
            if (!activeCategory) return 1;
            if (d.isRoot) return 1;
            return d.category === activeCategory ? 1 : 0.15;
        });

    g.selectAll('.link')
        .transition()
        .duration(300)
        .style('opacity', d => {
            if (!activeCategory) return d.type === 'relationship' ? 0.7 : 0.3;
            const sourceMatch = d.source.category === activeCategory || d.source.isRoot;
            const targetMatch = d.target.category === activeCategory || d.target.isRoot;
            return (sourceMatch && targetMatch) ? (d.type === 'relationship' ? 0.7 : 0.3) : 0.05;
        });

    // Update legend item active state
    document.querySelectorAll('.legend-item').forEach(item => {
        item.classList.toggle('active', item.dataset.category === activeCategory);
    });
}

// ============================================
// Search
// ============================================
function setupSearch() {
    const searchInput = document.getElementById('search-input');
    const resultsContainer = document.getElementById('search-results');

    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        if (query.length < 2) {
            resultsContainer.style.display = 'none';
            return;
        }

        const matches = nodes.filter(n =>
            n.name.toLowerCase().includes(query) ||
            (n.ticker && n.ticker.toLowerCase().includes(query))
        );

        resultsContainer.innerHTML = '';
        if (matches.length > 0) {
            resultsContainer.style.display = 'block';
            matches.slice(0, 10).forEach(match => {
                const div = document.createElement('div');
                div.className = 'search-result-item';
                div.innerHTML = `
                    <span class="name">${match.name}</span>
                    ${match.ticker ? `<span class="ticker">${match.ticker}</span>` : ''}
                `;
                div.onclick = () => {
                    focusOnNode(match);
                    resultsContainer.style.display = 'none';
                    searchInput.value = match.name;
                };
                resultsContainer.appendChild(div);
            });
        } else {
            resultsContainer.style.display = 'none';
        }
    });

    // Close on click outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.search-container')) {
            resultsContainer.style.display = 'none';
        }
    });
}

function focusOnNode(node) {
    const parent = svg.node().parentElement;
    const scale = 1.5;
    const x = parent.clientWidth / 2 - node.x * scale;
    const y = parent.clientHeight / 2 - node.y * scale;

    svg.transition()
        .duration(750)
        .call(zoom.transform, d3.zoomIdentity.translate(x, y).scale(scale));

    showNodeInfo(node);

    // Highlight node
    g.selectAll('.node circle')
        .transition()
        .duration(300)
        .attr('stroke-width', d => d.id === node.id ? 4 : 2);
}

// ============================================
// Legend
// ============================================
function setupLegend() {
    const legend = document.getElementById('legend-items');
    legend.innerHTML = '';

    Object.entries(categoryColors).forEach(([category, color]) => {
        const item = document.createElement('div');
        item.className = 'legend-item';
        item.dataset.category = category;
        item.innerHTML = `
            <span class="legend-dot" style="background-color: ${color}; box-shadow: 0 0 8px ${color};"></span>
            <span>${category}</span>
        `;
        item.onclick = () => filterByCategory(category);
        legend.appendChild(item);
    });
}

// ============================================
// Controls
// ============================================
function setupControls() {
    document.getElementById('zoom-in').onclick = () => {
        svg.transition().duration(300).call(zoom.scaleBy, 1.3);
    };
    document.getElementById('zoom-out').onclick = () => {
        svg.transition().duration(300).call(zoom.scaleBy, 0.7);
    };
    document.getElementById('reset-view').onclick = () => {
        activeCategory = null;
        document.querySelectorAll('.legend-item').forEach(item => item.classList.remove('active'));
        g.selectAll('.node').transition().duration(300).style('opacity', 1);
        g.selectAll('.link').transition().duration(300).style('opacity', d => d.type === 'relationship' ? 0.7 : 0.3);
        fitToView();
        hideNodeInfo();
    };
}

// ============================================
// Info Panel
// ============================================
async function showNodeInfo(node) {
    const panel = document.getElementById('info-panel');

    document.getElementById('company-name').textContent = node.name;

    const tickerBadge = document.getElementById('ticker-badge');
    const stockDataPanel = document.getElementById('stock-data');

    if (node.isCompany && node.ticker) {
        tickerBadge.style.display = 'flex';
        stockDataPanel.style.display = 'block';
        document.getElementById('company-ticker').textContent = node.ticker;
        document.getElementById('company-exchange').textContent = node.exchange || 'N/A';

        // Fetch stock data
        try {
            const stockData = await fetchStockData(node.ticker, node.exchange);
            updateStockDisplay(stockData);
        } catch (e) {
            console.error('Failed to fetch stock data:', e);
        }

        document.getElementById('yahoo-link').href = `https://finance.yahoo.com/quote/${node.ticker}`;
        document.getElementById('google-link').href = `https://www.google.com/search?q=${encodeURIComponent(node.name)}+stock`;
    } else {
        tickerBadge.style.display = 'none';
        stockDataPanel.style.display = 'none';
    }

    panel.classList.add('active');
    document.getElementById('close-panel').onclick = hideNodeInfo;
}

function hideNodeInfo() {
    document.getElementById('info-panel').classList.remove('active');
    g.selectAll('.node circle').transition().duration(300).attr('stroke-width', 2);
}

function updateStockDisplay(data) {
    if (!data) return;

    const priceEl = document.getElementById('stock-price');
    const changeEl = document.getElementById('stock-change');

    const currencySym = data.currency === 'USD' ? '$' : (data.currency || '') + ' ';

    priceEl.textContent = `${currencySym}${(data.price || 0).toFixed(2)}`;

    const change = data.change || 0;
    const changePercent = data.changePercent || 0;
    const changeSym = change >= 0 ? '+' : '';
    const changeClass = change >= 0 ? 'positive' : 'negative';

    changeEl.textContent = `${changeSym}${change.toFixed(2)} (${changeSym}${changePercent.toFixed(2)}%)`;
    changeEl.className = `stock-change ${changeClass}`;

    document.getElementById('market-cap').textContent = formatBigNumber(data.marketCap);
    document.getElementById('volume').textContent = formatBigNumber(data.volume);
    document.getElementById('high-52w').textContent = data.high52Week ? data.high52Week.toFixed(2) : 'N/A';
    document.getElementById('low-52w').textContent = data.low52Week ? data.low52Week.toFixed(2) : 'N/A';
}

function formatBigNumber(num) {
    if (!num) return 'N/A';
    if (num >= 1e12) return (num / 1e12).toFixed(2) + 'T';
    if (num >= 1e9) return (num / 1e9).toFixed(2) + 'B';
    if (num >= 1e6) return (num / 1e6).toFixed(2) + 'M';
    return num.toLocaleString();
}
