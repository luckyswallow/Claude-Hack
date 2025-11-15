// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add active state to navigation links on scroll
const sections = document.querySelectorAll('.section, .hero');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Add fade-in animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe cards for animation
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.content-card, .tool-card, .why-item, .team-card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // Jurisdiction data with official links
    const jurisdictionData = {
        us: {
            title: 'United States ESG Reporting',
            standards: [
                { name: 'SEC Climate Disclosure Rules', url: 'https://www.sec.gov/securities-topics/climate-esg' },
                { name: 'SASB (Sustainability Accounting Standards Board)', url: 'https://www.sasb.org/' },
                { name: 'Task Force on Climate-related Financial Disclosures (TCFD)', url: 'https://www.fsb-tcfd.org/' },
                { name: 'EPA Environmental Compliance', url: 'https://www.epa.gov/compliance' },
                { name: 'DOL Labor and Employment Standards', url: 'https://www.dol.gov/' }
            ]
        },
        uk: {
            title: 'United Kingdom ESG Reporting',
            standards: [
                { name: 'Streamlined Energy and Carbon Reporting (SECR)', url: 'https://www.gov.uk/government/publications/environmental-reporting-guidelines-including-mandatory-greenhouse-gas-emissions-reporting-guidance' },
                { name: 'Modern Slavery Act', url: 'https://www.legislation.gov.uk/ukpga/2015/30/contents' },
                { name: 'FCA Listing Rules on Climate Disclosures', url: 'https://www.fca.org.uk/publications/policy-statements/ps21-23-enhancing-climate-related-disclosures-listed-issuers' },
                { name: 'Companies Act 2006 Strategic Reporting', url: 'https://www.legislation.gov.uk/ukpga/2006/46/contents' },
                { name: 'TCFD Recommendations', url: 'https://www.fsb-tcfd.org/' }
            ]
        },
        eu: {
            title: 'European Union ESG Reporting',
            standards: [
                { name: 'Corporate Sustainability Reporting Directive (CSRD)', url: 'https://finance.ec.europa.eu/capital-markets-union-and-financial-markets/company-reporting-and-auditing/company-reporting/corporate-sustainability-reporting_en' },
                { name: 'EU Taxonomy for Sustainable Activities', url: 'https://finance.ec.europa.eu/sustainable-finance/tools-and-standards/eu-taxonomy-sustainable-activities_en' },
                { name: 'Sustainable Finance Disclosure Regulation (SFDR)', url: 'https://finance.ec.europa.eu/sustainable-finance/disclosures/sustainability-related-disclosure-financial-services-sector_en' },
                { name: 'Non-Financial Reporting Directive (NFRD)', url: 'https://finance.ec.europa.eu/capital-markets-union-and-financial-markets/company-reporting-and-auditing/company-reporting/non-financial-reporting_en' },
                { name: 'European Sustainability Reporting Standards (ESRS)', url: 'https://www.efrag.org/lab6' }
            ]
        },
        china: {
            title: 'China ESG Reporting',
            standards: [
                { name: 'CSRC Sustainability Guidelines', url: 'http://www.csrc.gov.cn/csrc_en/' },
                { name: 'Environmental Protection Law', url: 'https://www.mee.gov.cn/' },
                { name: 'Shanghai Stock Exchange ESG Disclosure', url: 'http://english.sse.com.cn/' },
                { name: 'Shenzhen Stock Exchange Sustainability Guidelines', url: 'http://www.szse.cn/English/' },
                { name: 'Green Finance Standards', url: 'http://www.pbc.gov.cn/en/' }
            ]
        },
        japan: {
            title: 'Japan ESG Reporting',
            standards: [
                { name: 'Tokyo Stock Exchange Corporate Governance Code', url: 'https://www.jpx.co.jp/english/news/1020/b5b4pj000000jvxr-att/20210611en.pdf' },
                { name: 'TCFD Recommendations', url: 'https://www.fsb-tcfd.org/' },
                { name: 'Ministry of Economy ESG Guidelines', url: 'https://www.meti.go.jp/english/' },
                { name: 'Japan Exchange Group Sustainability', url: 'https://www.jpx.co.jp/english/' },
                { name: 'Integrated Reporting Framework', url: 'https://www.integratedreporting.org/' }
            ]
        },
        korea: {
            title: 'South Korea ESG Reporting',
            standards: [
                { name: 'K-ESG Guidelines', url: 'https://www.fsc.go.kr/eng/' },
                { name: 'Financial Services Commission (FSC) ESG Rules', url: 'https://www.fsc.go.kr/eng/' },
                { name: 'Korea Exchange (KRX) ESG Disclosure', url: 'http://global.krx.co.kr/' },
                { name: 'Act on Sustainability Management', url: 'https://www.moleg.go.kr/english/' },
                { name: 'Korean Sustainability Standards Board', url: 'http://www.kasb.or.kr/' }
            ]
        },
        singapore: {
            title: 'Singapore ESG Reporting',
            standards: [
                { name: 'SGX Sustainability Reporting Requirements', url: 'https://www.sgx.com/regulation/sustainability-reporting' },
                { name: 'Singapore Exchange Listing Rules', url: 'https://www.sgx.com/regulation/regulatory-overview' },
                { name: 'Monetary Authority of Singapore ESG Guidelines', url: 'https://www.mas.gov.sg/regulation/sustainable-finance' },
                { name: 'TCFD-aligned Climate Disclosures', url: 'https://www.fsb-tcfd.org/' },
                { name: 'Singapore Green Plan 2030', url: 'https://www.greenplan.gov.sg/' }
            ]
        },
        global: {
            title: 'Global/Multi-Region ESG Reporting',
            standards: [
                { name: 'GRI (Global Reporting Initiative) Standards', url: 'https://www.globalreporting.org/standards/' },
                { name: 'International Sustainability Standards Board (ISSB)', url: 'https://www.ifrs.org/groups/international-sustainability-standards-board/' },
                { name: 'UN Sustainable Development Goals (SDGs)', url: 'https://sdgs.un.org/' },
                { name: 'TCFD Recommendations', url: 'https://www.fsb-tcfd.org/' },
                { name: 'CDP (Carbon Disclosure Project)', url: 'https://www.cdp.net/' }
            ]
        }
    };

    // Report type selection
    const reportTypeCards = document.querySelectorAll('.report-type-card');
    let selectedReportType = 'esg'; // Default to full ESG report

    reportTypeCards.forEach(card => {
        card.addEventListener('click', function() {
            // Remove active class from all cards
            reportTypeCards.forEach(c => c.classList.remove('active'));

            // Add active class to clicked card
            this.classList.add('active');

            // Get selected report type
            selectedReportType = this.getAttribute('data-report-type');
        });
    });

    // Jurisdiction selection
    const jurisdictionBtns = document.querySelectorAll('.jurisdiction-btn');
    const detailsContainer = document.getElementById('jurisdiction-details');
    const companyInputSection = document.getElementById('company-input-section');
    let selectedJurisdiction = null;

    jurisdictionBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            jurisdictionBtns.forEach(b => b.classList.remove('active'));

            // Add active class to clicked button
            this.classList.add('active');

            // Get selected region
            const region = this.getAttribute('data-region');
            selectedJurisdiction = region;
            const data = jurisdictionData[region];

            // Update details display
            if (data) {
                const standardsList = data.standards.map(s =>
                    `<li><a href="${s.url}" target="_blank" rel="noopener">${s.name} →</a></li>`
                ).join('');
                detailsContainer.innerHTML = `
                    <div class="details-content">
                        <h3>${data.title}</h3>
                        <ul>
                            ${standardsList}
                        </ul>
                    </div>
                `;

                // Show the company input form
                companyInputSection.style.display = 'block';

                // Smooth scroll to form
                setTimeout(() => {
                    companyInputSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }, 300);
            }
        });
    });

    // Form submission
    const esgForm = document.getElementById('esg-form');
    const reportResult = document.getElementById('report-result');
    const loadingEl = document.getElementById('loading');
    const successMessage = document.getElementById('success-message');
    const loadingStatus = document.getElementById('loading-status');

    // Store form data for report generation
    let reportData = {};

    if (esgForm) {
        esgForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form data
            const companyName = document.getElementById('company-name').value;
            const companyWebsite = document.getElementById('company-website').value;
            const companyDescription = document.getElementById('company-description').value;
            const additionalInfo = document.getElementById('additional-info').value;

            // Store data for report generation
            reportData = {
                companyName,
                companyWebsite,
                companyDescription,
                additionalInfo,
                jurisdiction: selectedJurisdiction,
                jurisdictionTitle: jurisdictionData[selectedJurisdiction].title,
                standards: jurisdictionData[selectedJurisdiction].standards,
                reportType: selectedReportType,
                generatedDate: new Date()
            };

            // Hide form, show result with loading
            companyInputSection.style.display = 'none';
            reportResult.style.display = 'block';
            loadingEl.style.display = 'block';
            successMessage.style.display = 'none';

            // Scroll to result
            reportResult.scrollIntoView({ behavior: 'smooth', block: 'center' });

            // Simulate AI processing with status updates
            const statusMessages = [
                'Initializing AI analysis...',
                'Scanning company website...',
                'Extracting ESG data...',
                'Analyzing sustainability initiatives...',
                `Tailoring report for ${jurisdictionData[selectedJurisdiction].title}...`,
                'Validating compliance requirements...',
                'Generating comprehensive report...',
                'Finalizing document...'
            ];

            let currentStatus = 0;
            const statusInterval = setInterval(() => {
                if (currentStatus < statusMessages.length) {
                    loadingStatus.textContent = statusMessages[currentStatus];
                    currentStatus++;
                } else {
                    clearInterval(statusInterval);
                }
            }, 600);

            // Show success after delay
            setTimeout(() => {
                clearInterval(statusInterval);
                loadingEl.style.display = 'none';
                successMessage.style.display = 'block';

                // Fill in report details
                document.getElementById('report-jurisdiction').textContent = jurisdictionData[selectedJurisdiction].title;
                document.getElementById('report-company').textContent = companyName;
                document.getElementById('report-date').textContent = new Date().toLocaleString();
            }, 5000);
        });
    }

    // Function to generate Environmental (E) Report
    function generateEnvironmentalReport(data) {
        const standardsList = data.standards.map(s =>
            `<li><a href="${s.url}" target="_blank" rel="noopener" style="color: #2563eb; text-decoration: none;">${s.name} →</a></li>`
        ).join('');

        return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Environmental Report - ${data.companyName}</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif; line-height: 1.6; color: #1f2937; background: #f9fafb; padding: 2rem; }
        .container { max-width: 900px; margin: 0 auto; background: white; padding: 3rem; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); border-radius: 0.5rem; }
        .header { text-align: center; border-bottom: 4px solid #10b981; padding-bottom: 2rem; margin-bottom: 2rem; }
        .logo { font-size: 1.5rem; font-weight: 700; color: #10b981; margin-bottom: 0.5rem; }
        h1 { font-size: 2.5rem; color: #1f2937; margin-bottom: 0.5rem; }
        .badge { display: inline-block; background: #10b981; color: white; padding: 0.5rem 1rem; border-radius: 0.25rem; font-weight: 600; margin: 1rem 0; }
        .report-meta { background: #f0fdf4; padding: 1.5rem; border-radius: 0.5rem; margin-bottom: 2rem; border-left: 4px solid #10b981; }
        .report-meta p { margin: 0.5rem 0; }
        .report-meta strong { color: #10b981; }
        h2 { font-size: 1.8rem; color: #10b981; margin: 2rem 0 1rem; border-bottom: 2px solid #e5e7eb; padding-bottom: 0.5rem; }
        h3 { font-size: 1.3rem; color: #1f2937; margin: 1.5rem 0 1rem; }
        p { margin: 1rem 0; color: #6b7280; }
        ul { list-style: none; padding: 0; margin: 1rem 0; }
        li { padding: 0.75rem; margin: 0.5rem 0; background: #f0fdf4; border-left: 4px solid #10b981; border-radius: 0.25rem; }
        li::before { content: '✓ '; color: #10b981; font-weight: bold; margin-right: 0.5rem; }
        .section { margin: 2rem 0; }
        .footer { margin-top: 3rem; padding-top: 2rem; border-top: 2px solid #e5e7eb; text-align: center; color: #6b7280; font-size: 0.9rem; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">ESGSync</div>
            <h1>🌱 Environmental Report</h1>
            <div class="badge">ENVIRONMENTAL ANALYSIS</div>
        </div>

        <div class="report-meta">
            <p><strong>Company:</strong> ${data.companyName}</p>
            <p><strong>Website:</strong> <a href="${data.companyWebsite}">${data.companyWebsite}</a></p>
            <p><strong>Jurisdiction:</strong> ${data.jurisdictionTitle}</p>
            <p><strong>Report Generated:</strong> ${data.generatedDate.toLocaleString()}</p>
        </div>

        <div class="section">
            <h2>Executive Summary</h2>
            <p>This Environmental (E) report provides a comprehensive assessment of <strong>${data.companyName}</strong>'s environmental performance, climate impact, and sustainability initiatives tailored to <strong>${data.jurisdictionTitle}</strong> requirements.</p>
        </div>

        <div class="section">
            <h2>Climate Change & Emissions</h2>
            <h3>Greenhouse Gas Emissions</h3>
            <ul>
                <li>Scope 1 emissions tracking and reduction targets</li>
                <li>Scope 2 emissions from purchased energy</li>
                <li>Scope 3 value chain emissions assessment</li>
                <li>Carbon footprint measurement and reporting</li>
                <li>Net-zero commitments aligned with Paris Agreement</li>
            </ul>

            <h3>Climate Action Initiatives</h3>
            <ul>
                <li>Science-based emissions reduction targets</li>
                <li>Renewable energy transition roadmap</li>
                <li>Carbon offset and removal projects</li>
                <li>Climate risk assessment and adaptation planning</li>
            </ul>
        </div>

        <div class="section">
            <h2>Energy Management</h2>
            <h3>Energy Efficiency</h3>
            <ul>
                <li>Energy consumption monitoring and reduction programs</li>
                <li>Building energy efficiency upgrades</li>
                <li>Energy-efficient equipment and technology adoption</li>
                <li>Employee energy conservation awareness</li>
            </ul>

            <h3>Renewable Energy</h3>
            <ul>
                <li>Renewable energy procurement (solar, wind, hydro)</li>
                <li>On-site renewable energy generation</li>
                <li>100% renewable electricity targets</li>
                <li>Clean energy partnerships and investments</li>
            </ul>
        </div>

        <div class="section">
            <h2>Resource Management</h2>
            <h3>Water Stewardship</h3>
            <ul>
                <li>Water consumption monitoring and reduction</li>
                <li>Wastewater treatment and recycling</li>
                <li>Water risk assessment in operations and supply chain</li>
                <li>Community water access support programs</li>
            </ul>

            <h3>Waste Management</h3>
            <ul>
                <li>Waste reduction and circular economy practices</li>
                <li>Recycling and composting programs</li>
                <li>Zero waste to landfill targets</li>
                <li>Hazardous waste proper handling and disposal</li>
            </ul>
        </div>

        <div class="section">
            <h2>Biodiversity & Ecosystems</h2>
            <ul>
                <li>Biodiversity impact assessments</li>
                <li>Habitat conservation and restoration</li>
                <li>No-net-loss or net-positive biodiversity commitments</li>
                <li>Sustainable land use and deforestation-free supply chains</li>
                <li>Support for ecosystem services and nature-based solutions</li>
            </ul>
        </div>

        <div class="section">
            <h2>Applicable Environmental Standards</h2>
            <p>Based on <strong>${data.jurisdictionTitle}</strong>:</p>
            <ul>
                ${standardsList}
            </ul>
        </div>

        <div class="section">
            <h2>Key Performance Indicators</h2>
            <ul>
                <li><strong>GHG Emissions Reduction:</strong> 50% by 2030, Net-Zero by 2050</li>
                <li><strong>Renewable Energy:</strong> 100% by 2030</li>
                <li><strong>Water Consumption:</strong> 30% reduction target</li>
                <li><strong>Waste Diversion:</strong> 90%+ from landfills</li>
                <li><strong>Biodiversity:</strong> Net-positive impact on all projects</li>
            </ul>
        </div>

        <div class="footer">
            <p>This Environmental report was generated by ESGSync - ESG Reporting Platform</p>
            <p>&copy; ${new Date().getFullYear()} ESGSync. Making sustainability reporting accessible to all.</p>
        </div>
    </div>
</body>
</html>`;
    }

    // Function to generate Social (S) Report
    function generateSocialReport(data) {
        const standardsList = data.standards.map(s =>
            `<li><a href="${s.url}" target="_blank" rel="noopener" style="color: #2563eb; text-decoration: none;">${s.name} →</a></li>`
        ).join('');

        return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Social Report - ${data.companyName}</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif; line-height: 1.6; color: #1f2937; background: #f9fafb; padding: 2rem; }
        .container { max-width: 900px; margin: 0 auto; background: white; padding: 3rem; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); border-radius: 0.5rem; }
        .header { text-align: center; border-bottom: 4px solid #f59e0b; padding-bottom: 2rem; margin-bottom: 2rem; }
        .logo { font-size: 1.5rem; font-weight: 700; color: #f59e0b; margin-bottom: 0.5rem; }
        h1 { font-size: 2.5rem; color: #1f2937; margin-bottom: 0.5rem; }
        .badge { display: inline-block; background: #f59e0b; color: white; padding: 0.5rem 1rem; border-radius: 0.25rem; font-weight: 600; margin: 1rem 0; }
        .report-meta { background: #fffbeb; padding: 1.5rem; border-radius: 0.5rem; margin-bottom: 2rem; border-left: 4px solid #f59e0b; }
        .report-meta p { margin: 0.5rem 0; }
        .report-meta strong { color: #f59e0b; }
        h2 { font-size: 1.8rem; color: #f59e0b; margin: 2rem 0 1rem; border-bottom: 2px solid #e5e7eb; padding-bottom: 0.5rem; }
        h3 { font-size: 1.3rem; color: #1f2937; margin: 1.5rem 0 1rem; }
        p { margin: 1rem 0; color: #6b7280; }
        ul { list-style: none; padding: 0; margin: 1rem 0; }
        li { padding: 0.75rem; margin: 0.5rem 0; background: #fffbeb; border-left: 4px solid #f59e0b; border-radius: 0.25rem; }
        li::before { content: '✓ '; color: #f59e0b; font-weight: bold; margin-right: 0.5rem; }
        .section { margin: 2rem 0; }
        .footer { margin-top: 3rem; padding-top: 2rem; border-top: 2px solid #e5e7eb; text-align: center; color: #6b7280; font-size: 0.9rem; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">ESGSync</div>
            <h1>👥 Social Report</h1>
            <div class="badge">SOCIAL IMPACT ANALYSIS</div>
        </div>

        <div class="report-meta">
            <p><strong>Company:</strong> ${data.companyName}</p>
            <p><strong>Website:</strong> <a href="${data.companyWebsite}">${data.companyWebsite}</a></p>
            <p><strong>Jurisdiction:</strong> ${data.jurisdictionTitle}</p>
            <p><strong>Report Generated:</strong> ${data.generatedDate.toLocaleString()}</p>
        </div>

        <div class="section">
            <h2>Executive Summary</h2>
            <p>This Social (S) report evaluates <strong>${data.companyName}</strong>'s commitment to employee wellbeing, diversity and inclusion, labor practices, and community engagement in compliance with <strong>${data.jurisdictionTitle}</strong> standards.</p>
        </div>

        <div class="section">
            <h2>Employee Wellbeing & Labor Practices</h2>
            <h3>Fair Employment</h3>
            <ul>
                <li>Living wage compliance for all employees and contractors</li>
                <li>Comprehensive benefits including health, dental, vision, and retirement</li>
                <li>Equal pay for equal work with regular pay equity audits</li>
                <li>Transparent salary bands and compensation frameworks</li>
                <li>Safe working conditions and health & safety protocols</li>
            </ul>

            <h3>Work-Life Balance</h3>
            <ul>
                <li>Flexible working arrangements and remote work options</li>
                <li>Generous paid time off and parental leave policies</li>
                <li>Mental health support and Employee Assistance Programs</li>
                <li>Reasonable working hours with overtime compensation</li>
            </ul>
        </div>

        <div class="section">
            <h2>Diversity, Equity & Inclusion</h2>
            <h3>Workforce Diversity</h3>
            <ul>
                <li>Diverse hiring practices across all demographics</li>
                <li>Women in leadership targets (40-60% representation)</li>
                <li>Board diversity and independence commitments</li>
                <li>Inclusive workplace culture and anti-discrimination policies</li>
                <li>Employee resource groups and affinity networks</li>
            </ul>

            <h3>Gender Equality</h3>
            <ul>
                <li>Gender pay gap targets (<2% across all levels)</li>
                <li>Paid parental leave for all genders</li>
                <li>Anti-harassment and safe workplace policies</li>
                <li>Promotion equity and career development for women</li>
            </ul>
        </div>

        <div class="section">
            <h2>Training & Development</h2>
            <ul>
                <li>40+ hours of training per employee annually</li>
                <li>Tuition reimbursement and continuing education support</li>
                <li>Leadership development and mentorship programs</li>
                <li>Skills training and professional certification support</li>
                <li>Career advancement pathways for all employees</li>
            </ul>
        </div>

        <div class="section">
            <h2>Community Engagement</h2>
            <h3>Social Impact</h3>
            <ul>
                <li>Community investment programs (1-2% of annual profits)</li>
                <li>Local hiring from economically disadvantaged areas</li>
                <li>Volunteer programs and paid volunteer time off</li>
                <li>Support for education, health, and social services</li>
            </ul>

            <h3>Supply Chain Responsibility</h3>
            <ul>
                <li>Supplier diversity programs (minority-owned, women-owned businesses)</li>
                <li>Fair labor practices throughout supply chain</li>
                <li>Human rights due diligence and audits</li>
                <li>Anti-forced labor and anti-child labor commitments</li>
            </ul>
        </div>

        <div class="section">
            <h2>Applicable Social Standards</h2>
            <p>Based on <strong>${data.jurisdictionTitle}</strong>:</p>
            <ul>
                ${standardsList}
            </ul>
        </div>

        <div class="section">
            <h2>Key Performance Indicators</h2>
            <ul>
                <li><strong>Employee Retention:</strong> >85% target</li>
                <li><strong>Gender Pay Gap:</strong> <2% across all levels</li>
                <li><strong>Workplace Diversity:</strong> 50% diverse representation</li>
                <li><strong>Employee Satisfaction:</strong> >4.0/5.0 score</li>
                <li><strong>Training Hours:</strong> 40+ hours per employee annually</li>
                <li><strong>Community Investment:</strong> 1-2% of annual profits</li>
            </ul>
        </div>

        <div class="footer">
            <p>This Social report was generated by ESGSync - ESG Reporting Platform</p>
            <p>&copy; ${new Date().getFullYear()} ESGSync. Making sustainability reporting accessible to all.</p>
        </div>
    </div>
</body>
</html>`;
    }

    // Function to generate Governance (G) Report
    function generateGovernanceReport(data) {
        const standardsList = data.standards.map(s =>
            `<li><a href="${s.url}" target="_blank" rel="noopener" style="color: #2563eb; text-decoration: none;">${s.name} →</a></li>`
        ).join('');

        return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Governance Report - ${data.companyName}</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif; line-height: 1.6; color: #1f2937; background: #f9fafb; padding: 2rem; }
        .container { max-width: 900px; margin: 0 auto; background: white; padding: 3rem; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); border-radius: 0.5rem; }
        .header { text-align: center; border-bottom: 4px solid #8b5cf6; padding-bottom: 2rem; margin-bottom: 2rem; }
        .logo { font-size: 1.5rem; font-weight: 700; color: #8b5cf6; margin-bottom: 0.5rem; }
        h1 { font-size: 2.5rem; color: #1f2937; margin-bottom: 0.5rem; }
        .badge { display: inline-block; background: #8b5cf6; color: white; padding: 0.5rem 1rem; border-radius: 0.25rem; font-weight: 600; margin: 1rem 0; }
        .report-meta { background: #f5f3ff; padding: 1.5rem; border-radius: 0.5rem; margin-bottom: 2rem; border-left: 4px solid #8b5cf6; }
        .report-meta p { margin: 0.5rem 0; }
        .report-meta strong { color: #8b5cf6; }
        h2 { font-size: 1.8rem; color: #8b5cf6; margin: 2rem 0 1rem; border-bottom: 2px solid #e5e7eb; padding-bottom: 0.5rem; }
        h3 { font-size: 1.3rem; color: #1f2937; margin: 1.5rem 0 1rem; }
        p { margin: 1rem 0; color: #6b7280; }
        ul { list-style: none; padding: 0; margin: 1rem 0; }
        li { padding: 0.75rem; margin: 0.5rem 0; background: #f5f3ff; border-left: 4px solid #8b5cf6; border-radius: 0.25rem; }
        li::before { content: '✓ '; color: #8b5cf6; font-weight: bold; margin-right: 0.5rem; }
        .section { margin: 2rem 0; }
        .footer { margin-top: 3rem; padding-top: 2rem; border-top: 2px solid #e5e7eb; text-align: center; color: #6b7280; font-size: 0.9rem; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">ESGSync</div>
            <h1>⚖️ Governance Report</h1>
            <div class="badge">GOVERNANCE & ETHICS ANALYSIS</div>
        </div>

        <div class="report-meta">
            <p><strong>Company:</strong> ${data.companyName}</p>
            <p><strong>Website:</strong> <a href="${data.companyWebsite}">${data.companyWebsite}</a></p>
            <p><strong>Jurisdiction:</strong> ${data.jurisdictionTitle}</p>
            <p><strong>Report Generated:</strong> ${data.generatedDate.toLocaleString()}</p>
        </div>

        <div class="section">
            <h2>Executive Summary</h2>
            <p>This Governance (G) report assesses <strong>${data.companyName}</strong>'s corporate governance structures, ethics and compliance programs, transparency, and accountability mechanisms in accordance with <strong>${data.jurisdictionTitle}</strong> requirements.</p>
        </div>

        <div class="section">
            <h2>Board Structure & Independence</h2>
            <h3>Board Composition</h3>
            <ul>
                <li>Independent board of directors with diverse expertise</li>
                <li>Majority independent directors (non-executive)</li>
                <li>Board diversity targets (gender, ethnicity, age, skills)</li>
                <li>Clear separation of board and management roles</li>
                <li>Regular board evaluations and performance assessments</li>
            </ul>

            <h3>Board Committees</h3>
            <ul>
                <li>Audit committee for financial oversight</li>
                <li>Compensation committee for executive pay</li>
                <li>Nominating and governance committee</li>
                <li>Risk management committee</li>
                <li>Sustainability/ESG committee</li>
            </ul>
        </div>

        <div class="section">
            <h2>Ethics & Compliance</h2>
            <h3>Code of Conduct</h3>
            <ul>
                <li>Comprehensive code of conduct for all employees</li>
                <li>Anti-corruption and anti-bribery policies (FCPA, UK Bribery Act compliance)</li>
                <li>Zero tolerance for fraud, corruption, and unethical behavior</li>
                <li>Regular ethics training for all employees (100% annually)</li>
            </ul>

            <h3>Whistleblower Protection</h3>
            <ul>
                <li>Confidential whistleblower hotline and reporting channels</li>
                <li>Protection from retaliation for good-faith reports</li>
                <li>Independent investigation of ethics violations</li>
                <li>Transparent tracking and resolution of reports</li>
            </ul>
        </div>

        <div class="section">
            <h2>Risk Management</h2>
            <ul>
                <li>Enterprise risk management framework</li>
                <li>Climate and ESG risk integration</li>
                <li>Cybersecurity and data privacy programs</li>
                <li>Business continuity and crisis management planning</li>
                <li>Regular risk assessments and audits</li>
            </ul>
        </div>

        <div class="section">
            <h2>Transparency & Accountability</h2>
            <h3>Disclosure & Reporting</h3>
            <ul>
                <li>Annual sustainability and ESG reporting</li>
                <li>Financial transparency and accurate disclosures</li>
                <li>Public disclosure of political contributions and lobbying</li>
                <li>Data privacy compliance (GDPR, CCPA, etc.)</li>
                <li>Regular third-party audits and certifications</li>
            </ul>

            <h3>Stakeholder Engagement</h3>
            <ul>
                <li>Shareholder rights and voting mechanisms</li>
                <li>Stakeholder grievance mechanisms</li>
                <li>Regular investor and stakeholder communications</li>
                <li>Public consultation on material issues</li>
            </ul>
        </div>

        <div class="section">
            <h2>Human Rights & Labor Standards</h2>
            <ul>
                <li>Human rights policy aligned with UN Guiding Principles</li>
                <li>Human rights due diligence across operations and supply chain</li>
                <li>Freedom of association and collective bargaining rights</li>
                <li>Anti-forced labor and anti-child labor commitments</li>
                <li>Remediation mechanisms for rights violations</li>
            </ul>
        </div>

        <div class="section">
            <h2>Executive Compensation</h2>
            <ul>
                <li>Transparent executive compensation disclosure</li>
                <li>Pay-for-performance alignment with long-term value creation</li>
                <li>CEO pay ratio disclosure</li>
                <li>ESG metrics integrated into executive compensation</li>
                <li>Clawback provisions for misconduct</li>
            </ul>
        </div>

        <div class="section">
            <h2>Applicable Governance Standards</h2>
            <p>Based on <strong>${data.jurisdictionTitle}</strong>:</p>
            <ul>
                ${standardsList}
            </ul>
        </div>

        <div class="section">
            <h2>Key Performance Indicators</h2>
            <ul>
                <li><strong>Board Independence:</strong> Majority independent directors</li>
                <li><strong>Board Diversity:</strong> 30%+ gender diversity minimum</li>
                <li><strong>Ethics Training:</strong> 100% of employees annually</li>
                <li><strong>Corruption Incidents:</strong> Zero tolerance target</li>
                <li><strong>Data Breaches:</strong> Zero incidents target</li>
                <li><strong>Transparency Score:</strong> Top quartile in industry rankings</li>
            </ul>
        </div>

        <div class="footer">
            <p>This Governance report was generated by ESGSync - ESG Reporting Platform</p>
            <p>&copy; ${new Date().getFullYear()} ESGSync. Making sustainability reporting accessible to all.</p>
        </div>
    </div>
</body>
</html>`;
    }

    // Function to generate HTML report
    function generateHTMLReport(data) {
        const standardsList = data.standards.map(s =>
            `<li><a href="${s.url}" target="_blank" rel="noopener" style="color: #2563eb; text-decoration: none;">${s.name} →</a></li>`
        ).join('');

        return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ESG Report - ${data.companyName}</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            line-height: 1.6;
            color: #1f2937;
            background: #f9fafb;
            padding: 2rem;
        }
        .container {
            max-width: 900px;
            margin: 0 auto;
            background: white;
            padding: 3rem;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
            border-radius: 0.5rem;
        }
        .header {
            text-align: center;
            border-bottom: 3px solid #2563eb;
            padding-bottom: 2rem;
            margin-bottom: 2rem;
        }
        .logo {
            font-size: 1.5rem;
            font-weight: 700;
            color: #2563eb;
            margin-bottom: 0.5rem;
        }
        h1 {
            font-size: 2.5rem;
            color: #1f2937;
            margin-bottom: 0.5rem;
        }
        .report-meta {
            background: #f3f4f6;
            padding: 1.5rem;
            border-radius: 0.5rem;
            margin-bottom: 2rem;
        }
        .report-meta p {
            margin: 0.5rem 0;
        }
        .report-meta strong {
            color: #2563eb;
        }
        h2 {
            font-size: 1.8rem;
            color: #2563eb;
            margin: 2rem 0 1rem;
            border-bottom: 2px solid #e5e7eb;
            padding-bottom: 0.5rem;
        }
        h3 {
            font-size: 1.3rem;
            color: #1f2937;
            margin: 1.5rem 0 1rem;
        }
        p {
            margin: 1rem 0;
            color: #6b7280;
        }
        ul {
            list-style: none;
            padding: 0;
            margin: 1rem 0;
        }
        li {
            padding: 0.75rem;
            margin: 0.5rem 0;
            background: #f9fafb;
            border-left: 4px solid #10b981;
            border-radius: 0.25rem;
        }
        li::before {
            content: '✓ ';
            color: #10b981;
            font-weight: bold;
            margin-right: 0.5rem;
        }
        .section {
            margin: 2rem 0;
        }
        .footer {
            margin-top: 3rem;
            padding-top: 2rem;
            border-top: 2px solid #e5e7eb;
            text-align: center;
            color: #6b7280;
            font-size: 0.9rem;
        }
        .badge {
            display: inline-block;
            background: #10b981;
            color: white;
            padding: 0.5rem 1rem;
            border-radius: 0.25rem;
            font-weight: 600;
            margin: 1rem 0;
        }
        @media print {
            body {
                background: white;
                padding: 0;
            }
            .container {
                box-shadow: none;
                padding: 1rem;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">ESGSync</div>
            <h1>ESG Compliance Report</h1>
            <div class="badge">AUTOMATED ANALYSIS REPORT</div>
        </div>

        <div class="report-meta">
            <p><strong>Company:</strong> ${data.companyName}</p>
            <p><strong>Website:</strong> <a href="${data.companyWebsite}">${data.companyWebsite}</a></p>
            <p><strong>Jurisdiction:</strong> ${data.jurisdictionTitle}</p>
            <p><strong>Report Generated:</strong> ${data.generatedDate.toLocaleString()}</p>
        </div>

        <div class="section">
            <h2>Executive Summary</h2>
            <p>This ESG (Environmental, Social, and Governance) compliance report has been automatically generated for <strong>${data.companyName}</strong> based on AI-powered analysis of company data and tailored to the specific requirements of <strong>${data.jurisdictionTitle}</strong>.</p>
            <p>The report analyzes the company's current ESG initiatives and maps them against the applicable regulatory frameworks and reporting standards for the selected jurisdiction.</p>
        </div>

        <div class="section">
            <h2>Company Overview</h2>
            <h3>Business Description</h3>
            ${data.companyDescription ? `<p>${data.companyDescription}</p>` : '<p><em>No description provided</em></p>'}

            ${data.additionalInfo ? `
            <h3>Additional Information</h3>
            <p>${data.additionalInfo}</p>
            ` : ''}
        </div>

        <div class="section">
            <h2>Applicable ESG Reporting Standards</h2>
            <p>Based on your selected jurisdiction (<strong>${data.jurisdictionTitle}</strong>), the following ESG reporting standards and frameworks apply to your organization:</p>
            <ul>
                ${standardsList}
            </ul>
        </div>

        <div class="section">
            <h2>Compliance Recommendations</h2>
            <h3>Environmental (E)</h3>
            <ul>
                <li>Establish carbon footprint measurement and reduction targets</li>
                <li>Implement energy efficiency programs and renewable energy adoption</li>
                <li>Develop waste management and circular economy initiatives</li>
                <li>Monitor and report water usage and conservation efforts</li>
            </ul>

            <h3>Social (S)</h3>
            <ul>
                <li>Ensure workplace diversity, equity, and inclusion programs</li>
                <li>Maintain employee health, safety, and wellbeing standards</li>
                <li>Engage in community development and social impact projects</li>
                <li>Uphold human rights and fair labor practices across supply chain</li>
            </ul>

            <h3>Governance (G)</h3>
            <ul>
                <li>Implement transparent corporate governance structures</li>
                <li>Establish board diversity and independence protocols</li>
                <li>Ensure ethical business practices and anti-corruption measures</li>
                <li>Maintain stakeholder engagement and accountability frameworks</li>
            </ul>
        </div>

        <div class="section">
            <h2>UN Sustainable Development Goals (SDGs) Alignment</h2>
            <p>Based on your company's activities and ESG initiatives, here's how <strong>${data.companyName}</strong> contributes to the United Nations Sustainable Development Goals:</p>

            <div style="margin-top: 2rem; margin-bottom: 2rem;">
                <h3 style="font-size: 1.2rem; color: #1f2937; margin-bottom: 1.5rem; text-align: center;">All 17 UN Sustainable Development Goals</h3>
                <p style="text-align: center; color: #6b7280; margin-bottom: 2rem; font-size: 0.95rem;">
                    <strong style="color: #2563eb;">Highlighted in color:</strong> Goals aligned with your company's activities |
                    <strong style="color: #9ca3af;">Shown in grey:</strong> Goals for potential future alignment
                </p>

                <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); gap: 1rem; margin-bottom: 2rem;">
                    <!-- SDG 1 -->
                    <div class="sdg-card" data-sdg="1" style="background: #ccc; padding: 1rem; border-radius: 0.5rem; text-align: center; aspect-ratio: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; cursor: pointer; transition: transform 0.3s ease;">
                        <div style="font-size: 2rem; font-weight: 800; color: white; margin-bottom: 0.5rem;">1</div>
                        <div style="font-size: 0.75rem; font-weight: 600; color: white; line-height: 1.2;">No Poverty</div>
                    </div>

                    <!-- SDG 2 -->
                    <div class="sdg-card" data-sdg="2" style="background: #ccc; padding: 1rem; border-radius: 0.5rem; text-align: center; aspect-ratio: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; cursor: pointer; transition: transform 0.3s ease;">
                        <div style="font-size: 2rem; font-weight: 800; color: white; margin-bottom: 0.5rem;">2</div>
                        <div style="font-size: 0.75rem; font-weight: 600; color: white; line-height: 1.2;">Zero Hunger</div>
                    </div>

                    <!-- SDG 3 -->
                    <div class="sdg-card" data-sdg="3" style="background: #ccc; padding: 1rem; border-radius: 0.5rem; text-align: center; aspect-ratio: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; cursor: pointer; transition: transform 0.3s ease;">
                        <div style="font-size: 2rem; font-weight: 800; color: white; margin-bottom: 0.5rem;">3</div>
                        <div style="font-size: 0.75rem; font-weight: 600; color: white; line-height: 1.2;">Good Health</div>
                    </div>

                    <!-- SDG 4 -->
                    <div class="sdg-card" data-sdg="4" style="background: #ccc; padding: 1rem; border-radius: 0.5rem; text-align: center; aspect-ratio: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; cursor: pointer; transition: transform 0.3s ease;">
                        <div style="font-size: 2rem; font-weight: 800; color: white; margin-bottom: 0.5rem;">4</div>
                        <div style="font-size: 0.75rem; font-weight: 600; color: white; line-height: 1.2;">Quality Education</div>
                    </div>

                    <!-- SDG 5 -->
                    <div class="sdg-card" data-sdg="5" style="background: #ccc; padding: 1rem; border-radius: 0.5rem; text-align: center; aspect-ratio: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; cursor: pointer; transition: transform 0.3s ease;">
                        <div style="font-size: 2rem; font-weight: 800; color: white; margin-bottom: 0.5rem;">5</div>
                        <div style="font-size: 0.75rem; font-weight: 600; color: white; line-height: 1.2;">Gender Equality</div>
                    </div>

                    <!-- SDG 6 -->
                    <div class="sdg-card" data-sdg="6" style="background: #ccc; padding: 1rem; border-radius: 0.5rem; text-align: center; aspect-ratio: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; cursor: pointer; transition: transform 0.3s ease;">
                        <div style="font-size: 2rem; font-weight: 800; color: white; margin-bottom: 0.5rem;">6</div>
                        <div style="font-size: 0.75rem; font-weight: 600; color: white; line-height: 1.2;">Clean Water</div>
                    </div>

                    <!-- SDG 7 - Highlighted -->
                    <div class="sdg-card" data-sdg="7" style="background: #FCC30B; padding: 1rem; border-radius: 0.5rem; text-align: center; aspect-ratio: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; box-shadow: 0 4px 6px rgba(0,0,0,0.1); cursor: pointer; transition: transform 0.3s ease;">
                        <div style="font-size: 2rem; font-weight: 800; color: white; margin-bottom: 0.5rem;">7</div>
                        <div style="font-size: 0.75rem; font-weight: 600; color: white; line-height: 1.2;">Clean Energy</div>
                    </div>

                    <!-- SDG 8 - Highlighted -->
                    <div class="sdg-card" data-sdg="8" style="background: #A21942; padding: 1rem; border-radius: 0.5rem; text-align: center; aspect-ratio: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; box-shadow: 0 4px 6px rgba(0,0,0,0.1); cursor: pointer; transition: transform 0.3s ease;">
                        <div style="font-size: 2rem; font-weight: 800; color: white; margin-bottom: 0.5rem;">8</div>
                        <div style="font-size: 0.75rem; font-weight: 600; color: white; line-height: 1.2;">Decent Work</div>
                    </div>

                    <!-- SDG 9 - Highlighted -->
                    <div class="sdg-card" data-sdg="9" style="background: #FD6925; padding: 1rem; border-radius: 0.5rem; text-align: center; aspect-ratio: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; box-shadow: 0 4px 6px rgba(0,0,0,0.1); cursor: pointer; transition: transform 0.3s ease;">
                        <div style="font-size: 2rem; font-weight: 800; color: white; margin-bottom: 0.5rem;">9</div>
                        <div style="font-size: 0.75rem; font-weight: 600; color: white; line-height: 1.2;">Innovation</div>
                    </div>

                    <!-- SDG 10 - Highlighted -->
                    <div class="sdg-card" data-sdg="10" style="background: #DD1367; padding: 1rem; border-radius: 0.5rem; text-align: center; aspect-ratio: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; box-shadow: 0 4px 6px rgba(0,0,0,0.1); cursor: pointer; transition: transform 0.3s ease;">
                        <div style="font-size: 2rem; font-weight: 800; color: white; margin-bottom: 0.5rem;">10</div>
                        <div style="font-size: 0.75rem; font-weight: 600; color: white; line-height: 1.2;">Reduced Inequalities</div>
                    </div>

                    <!-- SDG 11 -->
                    <div class="sdg-card" data-sdg="11" style="background: #ccc; padding: 1rem; border-radius: 0.5rem; text-align: center; aspect-ratio: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; cursor: pointer; transition: transform 0.3s ease;">
                        <div style="font-size: 2rem; font-weight: 800; color: white; margin-bottom: 0.5rem;">11</div>
                        <div style="font-size: 0.75rem; font-weight: 600; color: white; line-height: 1.2;">Sustainable Cities</div>
                    </div>

                    <!-- SDG 12 - Highlighted -->
                    <div class="sdg-card" data-sdg="12" style="background: #BF8B2E; padding: 1rem; border-radius: 0.5rem; text-align: center; aspect-ratio: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; box-shadow: 0 4px 6px rgba(0,0,0,0.1); cursor: pointer; transition: transform 0.3s ease;">
                        <div style="font-size: 2rem; font-weight: 800; color: white; margin-bottom: 0.5rem;">12</div>
                        <div style="font-size: 0.75rem; font-weight: 600; color: white; line-height: 1.2;">Responsible Consumption</div>
                    </div>

                    <!-- SDG 13 - Highlighted -->
                    <div class="sdg-card" data-sdg="13" style="background: #3F7E44; padding: 1rem; border-radius: 0.5rem; text-align: center; aspect-ratio: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; box-shadow: 0 4px 6px rgba(0,0,0,0.1); cursor: pointer; transition: transform 0.3s ease;">
                        <div style="font-size: 2rem; font-weight: 800; color: white; margin-bottom: 0.5rem;">13</div>
                        <div style="font-size: 0.75rem; font-weight: 600; color: white; line-height: 1.2;">Climate Action</div>
                    </div>

                    <!-- SDG 14 -->
                    <div class="sdg-card" data-sdg="14" style="background: #ccc; padding: 1rem; border-radius: 0.5rem; text-align: center; aspect-ratio: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; cursor: pointer; transition: transform 0.3s ease;">
                        <div style="font-size: 2rem; font-weight: 800; color: white; margin-bottom: 0.5rem;">14</div>
                        <div style="font-size: 0.75rem; font-weight: 600; color: white; line-height: 1.2;">Life Below Water</div>
                    </div>

                    <!-- SDG 15 -->
                    <div class="sdg-card" data-sdg="15" style="background: #ccc; padding: 1rem; border-radius: 0.5rem; text-align: center; aspect-ratio: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; cursor: pointer; transition: transform 0.3s ease;">
                        <div style="font-size: 2rem; font-weight: 800; color: white; margin-bottom: 0.5rem;">15</div>
                        <div style="font-size: 0.75rem; font-weight: 600; color: white; line-height: 1.2;">Life on Land</div>
                    </div>

                    <!-- SDG 16 -->
                    <div class="sdg-card" data-sdg="16" style="background: #ccc; padding: 1rem; border-radius: 0.5rem; text-align: center; aspect-ratio: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; cursor: pointer; transition: transform 0.3s ease;">
                        <div style="font-size: 2rem; font-weight: 800; color: white; margin-bottom: 0.5rem;">16</div>
                        <div style="font-size: 0.75rem; font-weight: 600; color: white; line-height: 1.2;">Peace & Justice</div>
                    </div>

                    <!-- SDG 17 -->
                    <div class="sdg-card" data-sdg="17" style="background: #ccc; padding: 1rem; border-radius: 0.5rem; text-align: center; aspect-ratio: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; cursor: pointer; transition: transform 0.3s ease;">
                        <div style="font-size: 2rem; font-weight: 800; color: white; margin-bottom: 0.5rem;">17</div>
                        <div style="font-size: 0.75rem; font-weight: 600; color: white; line-height: 1.2;">Partnerships</div>
                    </div>
                </div>

                <p style="text-align: center; color: #6b7280; margin-top: 1rem; font-style: italic;">
                    Click on any SDG icon above to generate a detailed report for that specific goal
                </p>
            </div>

            <div style="margin-top: 3rem;">
                <h3 style="font-size: 1.3rem; color: #1f2937; margin-bottom: 1rem;">Key SDG Contributions</h3>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem;">
                    <div style="padding: 1.5rem; background: #FFF9E6; border-left: 4px solid #FCC30B; border-radius: 0.5rem;">
                        <h4 style="color: #FCC30B; margin-bottom: 0.5rem; font-size: 1.1rem;">SDG 7: Affordable and Clean Energy</h4>
                        <p style="margin: 0; font-size: 0.95rem; color: #6b7280;">Potential alignment through renewable energy adoption and energy efficiency programs.</p>
                    </div>
                    <div style="padding: 1.5rem; background: #FFF0F5; border-left: 4px solid #A21942; border-radius: 0.5rem;">
                        <h4 style="color: #A21942; margin-bottom: 0.5rem; font-size: 1.1rem;">SDG 8: Decent Work and Economic Growth</h4>
                        <p style="margin: 0; font-size: 0.95rem; color: #6b7280;">Contribution through fair labor practices, employee wellbeing, and sustainable economic activities.</p>
                    </div>
                    <div style="padding: 1.5rem; background: #FFF5F0; border-left: 4px solid #FD6925; border-radius: 0.5rem;">
                        <h4 style="color: #FD6925; margin-bottom: 0.5rem; font-size: 1.1rem;">SDG 9: Industry, Innovation and Infrastructure</h4>
                        <p style="margin: 0; font-size: 0.95rem; color: #6b7280;">Support through innovative business practices and sustainable infrastructure development.</p>
                    </div>
                    <div style="padding: 1.5rem; background: #FFF0F8; border-left: 4px solid #DD1367; border-radius: 0.5rem;">
                        <h4 style="color: #DD1367; margin-bottom: 0.5rem; font-size: 1.1rem;">SDG 10: Reduced Inequalities</h4>
                        <p style="margin: 0; font-size: 0.95rem; color: #6b7280;">Advancement through diversity, equity, and inclusion initiatives in the workplace.</p>
                    </div>
                    <div style="padding: 1.5rem; background: #FFF9F0; border-left: 4px solid #BF8B2E; border-radius: 0.5rem;">
                        <h4 style="color: #BF8B2E; margin-bottom: 0.5rem; font-size: 1.1rem;">SDG 12: Responsible Consumption and Production</h4>
                        <p style="margin: 0; font-size: 0.95rem; color: #6b7280;">Implementation of circular economy principles and waste reduction strategies.</p>
                    </div>
                    <div style="padding: 1.5rem; background: #F0F8F0; border-left: 4px solid #3F7E44; border-radius: 0.5rem;">
                        <h4 style="color: #3F7E44; margin-bottom: 0.5rem; font-size: 1.1rem;">SDG 13: Climate Action</h4>
                        <p style="margin: 0; font-size: 0.95rem; color: #6b7280;">Direct contribution through carbon reduction targets and climate mitigation efforts.</p>
                    </div>
                </div>
            </div>

            <div style="margin-top: 2rem; padding: 1.5rem; background: #EBF5FB; border-radius: 0.5rem; border-left: 4px solid #19486A;">
                <h3 style="color: #19486A; margin-bottom: 0.5rem;">How to Strengthen SDG Alignment</h3>
                <ul style="margin: 0; padding-left: 1.5rem;">
                    <li style="margin: 0.5rem 0; background: transparent; border: none; padding: 0;">Set specific, measurable targets aligned with each relevant SDG</li>
                    <li style="margin: 0.5rem 0; background: transparent; border: none; padding: 0;">Integrate SDG indicators into your ESG reporting framework</li>
                    <li style="margin: 0.5rem 0; background: transparent; border: none; padding: 0;">Engage stakeholders in SDG-related initiatives and partnerships</li>
                    <li style="margin: 0.5rem 0; background: transparent; border: none; padding: 0;">Track and report progress against SDG targets annually</li>
                    <li style="margin: 0.5rem 0; background: transparent; border: none; padding: 0;">Learn more at <a href="https://sdgs.un.org/" target="_blank" style="color: #2563eb;">UN Sustainable Development Goals</a></li>
                </ul>
            </div>
        </div>

        <div class="section">
            <h2>Next Steps</h2>
            <ol style="list-style: decimal; padding-left: 2rem;">
                <li style="border-left: none; background: transparent; margin: 0.75rem 0;">
                    <strong>Data Collection:</strong> Gather comprehensive data across all ESG metrics relevant to your jurisdiction
                </li>
                <li style="border-left: none; background: transparent; margin: 0.75rem 0;">
                    <strong>Gap Analysis:</strong> Identify areas where current practices don't meet reporting requirements
                </li>
                <li style="border-left: none; background: transparent; margin: 0.75rem 0;">
                    <strong>Action Planning:</strong> Develop targeted initiatives to address compliance gaps
                </li>
                <li style="border-left: none; background: transparent; margin: 0.75rem 0;">
                    <strong>Implementation:</strong> Execute ESG improvement programs with measurable KPIs
                </li>
                <li style="border-left: none; background: transparent; margin: 0.75rem 0;">
                    <strong>Reporting:</strong> Prepare comprehensive disclosure documents according to applicable standards
                </li>
            </ol>
        </div>

        <div class="footer">
            <p>This report was generated by ESGSync - ESG Reporting Platform</p>
            <p>For more information, visit our platform or contact our ESG specialists</p>
            <p>&copy; ${new Date().getFullYear()} ESGSync. Making sustainability reporting accessible to all.</p>
        </div>
    </div>

    <script>
    // SDG detailed content database
    const sdgDetails = {
        '7': {
            title: 'SDG 7: Affordable and Clean Energy',
            subtitle: 'Ensure access to affordable, reliable, sustainable and modern energy for all',
            color: '#FCC30B',
            sections: [
                {
                    title: 'Company Contributions',
                    items: [
                        'Renewable energy adoption in operations',
                        'Energy efficiency programs and targets',
                        'Investment in clean energy technologies',
                        'Reducing reliance on fossil fuels',
                        'Supporting clean energy access in communities'
                    ]
                },
                {
                    title: 'Key Performance Indicators',
                    items: [
                        'Percentage of renewable energy use: Target 100% by 2030',
                        'Energy intensity reduction: 30% reduction target',
                        'Clean energy investments: Annual commitment tracking',
                        'Carbon emissions from energy: Reduction targets aligned with Paris Agreement'
                    ]
                },
                {
                    title: 'Action Plan',
                    items: [
                        'Conduct energy audit across all facilities',
                        'Install solar panels and renewable energy systems',
                        'Partner with clean energy providers',
                        'Employee education on energy conservation',
                        'Track and report energy metrics quarterly'
                    ]
                }
            ]
        },
        '8': {
            title: 'SDG 8: Decent Work and Economic Growth',
            subtitle: 'Promote sustained, inclusive and sustainable economic growth, full and productive employment and decent work for all',
            color: '#A21942',
            sections: [
                {
                    title: 'Hiring Equity & Fair Employment',
                    items: [
                        'Equal opportunity hiring practices across all demographics',
                        'Transparent recruitment processes with bias-free assessments',
                        'Diverse candidate sourcing and outreach programs',
                        'Pay equity analysis and commitment to equal pay for equal work',
                        'Accessibility accommodations for candidates with disabilities'
                    ]
                },
                {
                    title: 'Employee Protections & Benefits',
                    items: [
                        'Comprehensive health insurance and wellness programs',
                        'Competitive wages above living wage standards',
                        'Paid parental leave and family support benefits',
                        'Safe working conditions and health & safety protocols',
                        'Job security and protection against unjust termination',
                        'Workers\' rights to organize and collective bargaining',
                        'Mental health support and employee assistance programs'
                    ]
                },
                {
                    title: 'Professional Development',
                    items: [
                        'Continuous learning and skills training programs',
                        'Career advancement pathways and mentorship',
                        'Education assistance and tuition reimbursement',
                        'Leadership development opportunities',
                        'Performance-based promotions and merit increases'
                    ]
                },
                {
                    title: 'Work-Life Balance',
                    items: [
                        'Flexible working arrangements and remote work options',
                        'Reasonable working hours and overtime compensation',
                        'Paid time off and vacation policies',
                        'Respect for personal time and right to disconnect',
                        'Employee wellbeing initiatives'
                    ]
                },
                {
                    title: 'Diversity, Equity & Inclusion',
                    items: [
                        'Diverse workforce composition across all levels',
                        'Inclusive workplace culture and anti-discrimination policies',
                        'Employee resource groups and affinity networks',
                        'Regular diversity training and awareness programs',
                        'Measurable DEI goals and transparent reporting'
                    ]
                },
                {
                    title: 'Key Performance Indicators',
                    items: [
                        'Employee retention rate: Target >85%',
                        'Gender pay gap: Target <2%',
                        'Workplace diversity: 50% diverse representation target',
                        'Employee satisfaction score: Target >4.0/5.0',
                        'Training hours per employee: Target 40+ hours annually',
                        'Workplace safety: Zero serious incidents target'
                    ]
                }
            ]
        },
        '9': {
            title: 'SDG 9: Industry, Innovation and Infrastructure',
            subtitle: 'Build resilient infrastructure, promote inclusive and sustainable industrialization and foster innovation',
            color: '#FD6925',
            sections: [
                {
                    title: 'Innovation & R&D',
                    items: [
                        'Investment in research and development programs',
                        'Digital transformation and technology adoption',
                        'Innovation labs and experimentation culture',
                        'Partnerships with research institutions',
                        'Patent development and intellectual property'
                    ]
                },
                {
                    title: 'Sustainable Infrastructure',
                    items: [
                        'Green building certifications for facilities',
                        'Sustainable supply chain infrastructure',
                        'Energy-efficient manufacturing processes',
                        'Digital infrastructure and connectivity',
                        'Circular economy principles in operations'
                    ]
                },
                {
                    title: 'Key Performance Indicators',
                    items: [
                        'R&D investment: 5-10% of revenue',
                        'Digital transformation progress: 80% digitization target',
                        'Sustainable infrastructure: LEED certification for all facilities',
                        'Innovation output: Product/service improvements per year'
                    ]
                }
            ]
        },
        '10': {
            title: 'SDG 10: Reduced Inequalities',
            subtitle: 'Reduce inequality within and among countries',
            color: '#DD1367',
            sections: [
                {
                    title: 'Workplace Equality',
                    items: [
                        'Equal pay for equal work regardless of gender, race, or background',
                        'Inclusive hiring practices for underrepresented groups',
                        'Accessibility for employees with disabilities',
                        'Anti-discrimination and anti-harassment policies',
                        'Promotion equity across demographic groups'
                    ]
                },
                {
                    title: 'Social Equity Programs',
                    items: [
                        'Partnerships with minority-owned suppliers',
                        'Community investment in underserved areas',
                        'Scholarship programs for disadvantaged students',
                        'Financial inclusion initiatives',
                        'Support for social mobility programs'
                    ]
                },
                {
                    title: 'Key Performance Indicators',
                    items: [
                        'Pay equity index: Gender and racial pay gap <2%',
                        'Representation of underrepresented groups: 40% target',
                        'Supplier diversity: 30% spend with diverse suppliers',
                        'Community investment: 1% of profits to underserved communities'
                    ]
                }
            ]
        },
        '12': {
            title: 'SDG 12: Responsible Consumption and Production',
            subtitle: 'Ensure sustainable consumption and production patterns',
            color: '#BF8B2E',
            sections: [
                {
                    title: 'Circular Economy Practices',
                    items: [
                        'Product design for durability and recyclability',
                        'Waste reduction and recycling programs',
                        'Sustainable materials sourcing',
                        'Product lifecycle management',
                        'Take-back and recycling programs'
                    ]
                },
                {
                    title: 'Sustainable Supply Chain',
                    items: [
                        'Responsible sourcing policies',
                        'Supplier sustainability assessments',
                        'Local sourcing to reduce carbon footprint',
                        'Ethical supply chain practices',
                        'Transparency in supply chain operations'
                    ]
                },
                {
                    title: 'Waste Management',
                    items: [
                        'Zero waste to landfill targets',
                        'Food waste reduction programs',
                        'Packaging waste minimization',
                        'Industrial waste recycling',
                        'Hazardous waste proper disposal'
                    ]
                },
                {
                    title: 'Key Performance Indicators',
                    items: [
                        'Waste diversion rate: Target 90%+',
                        'Recycled content: 50% of materials from recycled sources',
                        'Sustainable sourcing: 100% sustainable materials by 2030',
                        'Product recyclability: 95% of products recyclable'
                    ]
                }
            ]
        },
        '13': {
            title: 'SDG 13: Climate Action',
            subtitle: 'Take urgent action to combat climate change and its impacts',
            color: '#3F7E44',
            sections: [
                {
                    title: 'Carbon Reduction Targets',
                    items: [
                        'Net-zero emissions commitment by 2050',
                        'Science-based targets aligned with 1.5°C pathway',
                        'Scope 1, 2, and 3 emissions reduction plans',
                        'Annual emissions reduction milestones',
                        'Carbon offset and removal projects'
                    ]
                },
                {
                    title: 'Climate Adaptation',
                    items: [
                        'Climate risk assessment and planning',
                        'Resilient infrastructure development',
                        'Supply chain climate resilience',
                        'Emergency preparedness for climate events',
                        'Community climate adaptation support'
                    ]
                },
                {
                    title: 'Clean Energy Transition',
                    items: [
                        '100% renewable electricity target',
                        'Electrification of vehicle fleet',
                        'Energy efficiency improvements',
                        'Green building standards',
                        'Investment in climate solutions'
                    ]
                },
                {
                    title: 'Key Performance Indicators',
                    items: [
                        'GHG emissions reduction: 50% by 2030, net-zero by 2050',
                        'Renewable energy: 100% by 2030',
                        'Carbon intensity: 75% reduction target',
                        'Climate investment: 10% of capex in climate solutions'
                    ]
                }
            ]
        },
        '1': {
            title: 'SDG 1: No Poverty',
            subtitle: 'End poverty in all its forms everywhere',
            color: '#E5243B',
            sections: [
                {
                    title: 'Living Wage & Economic Security',
                    items: [
                        'Pay all employees above living wage standards in every region',
                        'Comprehensive benefits package including retirement, healthcare, and emergency funds',
                        'Financial wellness programs and literacy training',
                        'Employee assistance programs for financial hardship',
                        'Transparent salary bands and pay equity across all roles'
                    ]
                },
                {
                    title: 'Community Investment',
                    items: [
                        'Local hiring programs in economically disadvantaged areas',
                        'Supplier diversity focusing on small and minority-owned businesses',
                        'Community development partnerships and grants',
                        'Support for affordable housing initiatives near company facilities',
                        'Educational scholarships for underprivileged students'
                    ]
                },
                {
                    title: 'Supply Chain Impact',
                    items: [
                        'Fair trade practices and ethical sourcing commitments',
                        'Supplier audits to ensure living wages throughout supply chain',
                        'Support for supplier development in emerging markets',
                        'Economic empowerment programs for marginalized communities'
                    ]
                },
                {
                    title: 'Key Performance Indicators',
                    items: [
                        'Living wage compliance: 100% of employees and contract workers',
                        'Community investment: 1-2% of annual profits',
                        'Local procurement: 30% from economically disadvantaged areas',
                        'Financial hardship assistance: Support provided to 100% of applicants in need'
                    ]
                }
            ]
        },
        '2': {
            title: 'SDG 2: Zero Hunger',
            subtitle: 'End hunger, achieve food security and improved nutrition',
            color: '#DDA63A',
            sections: [
                {
                    title: 'Employee Food Security',
                    items: [
                        'Subsidized or free nutritious meals for all employees',
                        'Food assistance programs for employees facing hardship',
                        'Partnerships with food banks and nutrition programs',
                        'Healthy snacks and beverages provided in all facilities',
                        'Nutrition education and wellness programs'
                    ]
                },
                {
                    title: 'Community Programs',
                    items: [
                        'Corporate donations to local food banks and hunger relief organizations',
                        'Employee volunteer programs for food distribution',
                        'Support for urban agriculture and community gardens',
                        'Partnerships with organizations fighting food insecurity',
                        'Food rescue programs to reduce waste and feed communities'
                    ]
                },
                {
                    title: 'Sustainable Food Systems',
                    items: [
                        'Sustainable sourcing practices for cafeteria and catering',
                        'Support for regenerative agriculture initiatives',
                        'Reduction of food waste across operations',
                        'Investment in food technology innovations'
                    ]
                },
                {
                    title: 'Key Performance Indicators',
                    items: [
                        'Employee food security: 100% access to nutritious meals',
                        'Food donations: Meals provided to community annually',
                        'Food waste reduction: 50% decrease target',
                        'Volunteer hours: Employee participation in hunger relief programs'
                    ]
                }
            ]
        },
        '3': {
            title: 'SDG 3: Good Health and Well-Being',
            subtitle: 'Ensure healthy lives and promote well-being for all at all ages',
            color: '#4C9F38',
            sections: [
                {
                    title: 'Employee Health & Wellness',
                    items: [
                        'Comprehensive health insurance covering medical, dental, and vision',
                        'Mental health support including counseling and therapy services',
                        'On-site health clinics and wellness centers',
                        'Preventive care programs and annual health screenings',
                        'Fitness subsidies and workplace wellness initiatives',
                        'Paid sick leave and family medical leave policies',
                        'Ergonomic workspaces and injury prevention programs'
                    ]
                },
                {
                    title: 'Mental Health & Work-Life Balance',
                    items: [
                        'Employee Assistance Programs (EAP) with 24/7 access',
                        'Mental health days and flexible time off policies',
                        'Stress management and mindfulness programs',
                        'Manager training on mental health awareness',
                        'Destigmatization campaigns and open dialogue initiatives',
                        'Work-from-home and flexible scheduling options'
                    ]
                },
                {
                    title: 'Community Health Impact',
                    items: [
                        'Health education and awareness campaigns',
                        'Partnerships with local health organizations',
                        'Support for public health initiatives',
                        'Employee volunteer programs for health services',
                        'Donations to healthcare accessibility programs'
                    ]
                },
                {
                    title: 'Key Performance Indicators',
                    items: [
                        'Health coverage: 100% of employees with comprehensive plans',
                        'Mental health utilization: Tracking EAP usage and satisfaction',
                        'Employee wellness score: Target >4.0/5.0',
                        'Workplace injuries: Zero serious incidents target',
                        'Health program participation: >60% employee engagement'
                    ]
                }
            ]
        },
        '4': {
            title: 'SDG 4: Quality Education',
            subtitle: 'Ensure inclusive and equitable quality education and promote lifelong learning',
            color: '#C5192D',
            sections: [
                {
                    title: 'Employee Learning & Development',
                    items: [
                        'Tuition reimbursement programs for continued education',
                        'Internal training programs and skill development courses',
                        'Leadership development and mentorship programs',
                        'Access to online learning platforms and resources',
                        'Professional certifications and conference attendance support',
                        'Career development planning and coaching',
                        'Cross-functional training and job rotation opportunities'
                    ]
                },
                {
                    title: 'Community Education Programs',
                    items: [
                        'STEM education partnerships with local schools',
                        'Scholarship programs for underrepresented students',
                        'Internship and apprenticeship opportunities',
                        'Coding bootcamps and technology literacy programs',
                        'Guest lectures and career mentoring in schools',
                        'Donations of equipment and resources to educational institutions'
                    ]
                },
                {
                    title: 'Digital Literacy & Access',
                    items: [
                        'Technology access programs for underserved communities',
                        'Digital skills training for employees and community members',
                        'Support for libraries and educational technology initiatives',
                        'Open educational resources and knowledge sharing'
                    ]
                },
                {
                    title: 'Key Performance Indicators',
                    items: [
                        'Training hours per employee: Target 40+ hours annually',
                        'Tuition reimbursement: 100% participation rate for eligible employees',
                        'Scholarship recipients: Number of students supported annually',
                        'Community education reach: Individuals impacted by programs',
                        'Employee skill advancement: Percentage completing certifications'
                    ]
                }
            ]
        },
        '5': {
            title: 'SDG 5: Gender Equality',
            subtitle: 'Achieve gender equality and empower all women and girls',
            color: '#FF3A21',
            sections: [
                {
                    title: 'Gender Pay Equity',
                    items: [
                        'Regular pay equity audits and transparent reporting',
                        'Commitment to equal pay for equal work across all roles',
                        'Public disclosure of gender pay gap metrics',
                        'Proactive salary adjustments to close identified gaps',
                        'Compensation frameworks that eliminate bias'
                    ]
                },
                {
                    title: 'Women in Leadership',
                    items: [
                        'Leadership development programs for women',
                        'Targets for women in senior leadership positions',
                        'Mentorship and sponsorship programs',
                        'Board diversity commitments',
                        'Succession planning with gender balance focus',
                        'Women\'s employee resource groups and networks'
                    ]
                },
                {
                    title: 'Family Support & Work-Life Balance',
                    items: [
                        'Generous paid parental leave for all genders',
                        'On-site childcare or childcare subsidies',
                        'Flexible work arrangements for caregivers',
                        'Return-to-work programs after parental leave',
                        'Lactation rooms and family-friendly facilities',
                        'Equal parental leave policies to promote shared caregiving'
                    ]
                },
                {
                    title: 'Anti-Harassment & Safe Workplace',
                    items: [
                        'Zero-tolerance policy for harassment and discrimination',
                        'Regular training on respect, inclusion, and bystander intervention',
                        'Clear reporting mechanisms with protection from retaliation',
                        'Swift investigation and accountability for violations',
                        'Safe spaces and support resources for affected individuals'
                    ]
                },
                {
                    title: 'Key Performance Indicators',
                    items: [
                        'Gender pay gap: Target <2% across all levels',
                        'Women in leadership: 40-60% representation in senior roles',
                        'Women on board: Minimum 30% board representation',
                        'Parental leave utilization: Equal uptake across genders',
                        'Retention after parental leave: >90% return rate'
                    ]
                }
            ]
        },
        '6': {
            title: 'SDG 6: Clean Water and Sanitation',
            subtitle: 'Ensure availability and sustainable management of water and sanitation for all',
            color: '#26BDE2',
            sections: [
                {
                    title: 'Water Conservation',
                    items: [
                        'Water-efficient fixtures and technologies in all facilities',
                        'Rainwater harvesting and greywater recycling systems',
                        'Water consumption monitoring and reduction targets',
                        'Landscape design using native, drought-resistant plants',
                        'Employee education on water conservation practices'
                    ]
                },
                {
                    title: 'Water Quality Management',
                    items: [
                        'Wastewater treatment before discharge',
                        'Regular water quality testing and monitoring',
                        'Prevention of water pollution from operations',
                        'Compliance with all water quality regulations',
                        'Investment in clean water technologies'
                    ]
                },
                {
                    title: 'Community Water Access',
                    items: [
                        'Support for clean water projects in water-scarce regions',
                        'Partnerships with water.org and similar organizations',
                        'Employee volunteer programs for water infrastructure projects',
                        'Advocacy for universal water access policies',
                        'Donations to water sanitation initiatives'
                    ]
                },
                {
                    title: 'Supply Chain Water Stewardship',
                    items: [
                        'Water risk assessments in supply chain',
                        'Supplier engagement on water conservation',
                        'Support for suppliers in water-stressed regions',
                        'Sustainable sourcing from water-responsible suppliers'
                    ]
                },
                {
                    title: 'Key Performance Indicators',
                    items: [
                        'Water consumption reduction: 30% decrease target',
                        'Water recycling rate: 50% of water reused',
                        'Wastewater treatment: 100% before discharge',
                        'Community water projects: Number of people with access to clean water',
                        'Water-stressed operations: Zero negative impact on local water sources'
                    ]
                }
            ]
        },
        '11': {
            title: 'SDG 11: Sustainable Cities and Communities',
            subtitle: 'Make cities and human settlements inclusive, safe, resilient and sustainable',
            color: '#FD9D24',
            sections: [
                {
                    title: 'Sustainable Facilities',
                    items: [
                        'LEED or equivalent green building certifications for all offices',
                        'Energy-efficient building systems and smart controls',
                        'Green roofs and urban biodiversity initiatives',
                        'Sustainable materials and construction practices',
                        'Adaptive reuse of existing buildings when possible'
                    ]
                },
                {
                    title: 'Sustainable Transportation',
                    items: [
                        'Public transit subsidies and incentives for employees',
                        'Bike-to-work programs and secure bike storage',
                        'Electric vehicle charging stations at all facilities',
                        'Shuttle services using clean energy vehicles',
                        'Remote work options to reduce commuting',
                        'Carpool and vanpool coordination programs'
                    ]
                },
                {
                    title: 'Community Engagement',
                    items: [
                        'Investment in local infrastructure improvements',
                        'Support for affordable housing initiatives',
                        'Partnerships with local governments on smart city projects',
                        'Public space improvements and community amenities',
                        'Disaster resilience and emergency preparedness programs'
                    ]
                },
                {
                    title: 'Urban Green Spaces',
                    items: [
                        'Creation and maintenance of green spaces',
                        'Urban tree planting and restoration programs',
                        'Community gardens and urban agriculture support',
                        'Public parks and recreation area sponsorships'
                    ]
                },
                {
                    title: 'Key Performance Indicators',
                    items: [
                        'Green building certifications: 100% of facilities',
                        'Employee sustainable commuting: >50% using public transit, bike, or carpool',
                        'EV charging capacity: Stations available at all major sites',
                        'Community investment: Projects supported annually',
                        'Urban greening: Square meters of green space created or maintained'
                    ]
                }
            ]
        },
        '14': {
            title: 'SDG 14: Life Below Water',
            subtitle: 'Conserve and sustainably use the oceans, seas and marine resources',
            color: '#0A97D9',
            sections: [
                {
                    title: 'Ocean Plastic Reduction',
                    items: [
                        'Elimination of single-use plastics across all operations',
                        'Plastic-free packaging and product design',
                        'Support for ocean cleanup initiatives',
                        'Employee education on plastic pollution',
                        'Partnerships with organizations like Ocean Conservancy'
                    ]
                },
                {
                    title: 'Sustainable Sourcing',
                    items: [
                        'Sustainable seafood policies (if applicable)',
                        'Marine Stewardship Council (MSC) certified suppliers',
                        'Avoidance of products linked to ocean degradation',
                        'Supply chain transparency for marine resources',
                        'Support for sustainable fishing communities'
                    ]
                },
                {
                    title: 'Marine Conservation',
                    items: [
                        'Donations to marine conservation organizations',
                        'Support for marine protected areas',
                        'Coral reef restoration programs',
                        'Research partnerships on ocean health',
                        'Employee volunteer programs for beach cleanups'
                    ]
                },
                {
                    title: 'Pollution Prevention',
                    items: [
                        'Zero discharge of pollutants into waterways',
                        'Microplastic prevention in products and processes',
                        'Stormwater management and runoff prevention',
                        'Chemical management to prevent ocean contamination'
                    ]
                },
                {
                    title: 'Key Performance Indicators',
                    items: [
                        'Plastic elimination: 100% single-use plastic removal',
                        'Ocean cleanup support: Tons of plastic removed annually',
                        'Sustainable sourcing: 100% MSC-certified seafood (if applicable)',
                        'Pollution discharge: Zero harmful substances to water',
                        'Marine conservation funding: Annual donation targets'
                    ]
                }
            ]
        },
        '15': {
            title: 'SDG 15: Life on Land',
            subtitle: 'Protect, restore and promote sustainable use of terrestrial ecosystems',
            color: '#56C02B',
            sections: [
                {
                    title: 'Biodiversity Protection',
                    items: [
                        'No-net-loss or net-positive biodiversity targets',
                        'Habitat conservation on company-owned land',
                        'Wildlife corridors and native species protection',
                        'Invasive species management and prevention',
                        'Biodiversity impact assessments for all projects'
                    ]
                },
                {
                    title: 'Sustainable Land Use',
                    items: [
                        'Sustainable forestry and zero-deforestation commitments',
                        'Responsible land acquisition and development practices',
                        'Soil health and regeneration programs',
                        'Integration of natural landscapes in facility design',
                        'Land restoration and reforestation projects'
                    ]
                },
                {
                    title: 'Forest Conservation',
                    items: [
                        'Forest Stewardship Council (FSC) certified materials',
                        'Support for reforestation and afforestation projects',
                        'Partnerships with conservation organizations',
                        'Employee tree-planting initiatives',
                        'Protection of old-growth and primary forests'
                    ]
                },
                {
                    title: 'Ecosystem Restoration',
                    items: [
                        'Degraded land rehabilitation programs',
                        'Wetland conservation and restoration',
                        'Native plant landscaping at all facilities',
                        'Pollinator-friendly gardens and habitats',
                        'Support for ecosystem services research'
                    ]
                },
                {
                    title: 'Key Performance Indicators',
                    items: [
                        'Deforestation-free supply chain: 100% compliance',
                        'FSC certification: 100% of paper and wood products',
                        'Trees planted: Annual reforestation targets',
                        'Biodiversity net gain: Positive impact on all projects',
                        'Land restored: Hectares of degraded land rehabilitated'
                    ]
                }
            ]
        },
        '16': {
            title: 'SDG 16: Peace, Justice and Strong Institutions',
            subtitle: 'Promote peaceful and inclusive societies, provide access to justice for all',
            color: '#00689D',
            sections: [
                {
                    title: 'Corporate Governance',
                    items: [
                        'Transparent governance structures and decision-making processes',
                        'Independent board of directors with diverse expertise',
                        'Regular board evaluations and accountability mechanisms',
                        'Clear separation of board and management roles',
                        'Stakeholder engagement in governance matters',
                        'Public disclosure of governance policies and practices'
                    ]
                },
                {
                    title: 'Ethics & Compliance',
                    items: [
                        'Comprehensive code of conduct for all employees',
                        'Anti-corruption and anti-bribery policies (FCPA compliance)',
                        'Regular ethics training for employees and leadership',
                        'Whistleblower protections and confidential reporting channels',
                        'Third-party ethics audits and compliance reviews',
                        'Zero tolerance for fraud, corruption, and unethical behavior'
                    ]
                },
                {
                    title: 'Human Rights',
                    items: [
                        'Human rights policy aligned with UN Guiding Principles',
                        'Human rights due diligence across operations and supply chain',
                        'Remediation mechanisms for rights violations',
                        'Freedom of association and collective bargaining rights',
                        'Anti-forced labor and anti-child labor commitments',
                        'Regular human rights impact assessments'
                    ]
                },
                {
                    title: 'Transparency & Accountability',
                    items: [
                        'Annual sustainability and ESG reporting',
                        'Financial transparency and accurate disclosures',
                        'Stakeholder grievance mechanisms',
                        'Regular audits by independent third parties',
                        'Public disclosure of political contributions and lobbying',
                        'Data privacy and protection compliance (GDPR, CCPA)'
                    ]
                },
                {
                    title: 'Community & Social Justice',
                    items: [
                        'Support for social justice initiatives and organizations',
                        'Pro bono services and legal aid support',
                        'Partnerships with justice and equality organizations',
                        'Advocacy for inclusive policies and regulations',
                        'Community safety and security programs'
                    ]
                },
                {
                    title: 'Key Performance Indicators',
                    items: [
                        'Ethics training: 100% of employees annually',
                        'Whistleblower reports: Tracked and resolved transparently',
                        'Board independence: Majority independent directors',
                        'Human rights audits: 100% of high-risk suppliers audited',
                        'Corruption incidents: Zero tolerance, zero incidents target',
                        'Transparency score: Top quartile in industry rankings'
                    ]
                }
            ]
        },
        '17': {
            title: 'SDG 17: Partnerships for the Goals',
            subtitle: 'Strengthen the means of implementation and revitalize global partnerships',
            color: '#19486A',
            sections: [
                {
                    title: 'Multi-Stakeholder Partnerships',
                    items: [
                        'Collaborations with NGOs, governments, and international organizations',
                        'Industry coalitions for sustainability and innovation',
                        'Academic partnerships for research and development',
                        'Public-private partnerships for social impact',
                        'Cross-sector initiatives addressing global challenges'
                    ]
                },
                {
                    title: 'Knowledge Sharing',
                    items: [
                        'Open-source contributions and technology sharing',
                        'Best practices documentation and dissemination',
                        'Industry conferences and thought leadership',
                        'Sustainability reporting and transparency initiatives',
                        'Collaborative research and innovation programs',
                        'Mentorship and capacity building for other organizations'
                    ]
                },
                {
                    title: 'Supply Chain Collaboration',
                    items: [
                        'Supplier sustainability development programs',
                        'Collaborative supplier audits and improvements',
                        'Technology and expertise sharing with suppliers',
                        'Joint sustainability targets with key partners',
                        'Industry-wide standards development participation'
                    ]
                },
                {
                    title: 'Financial Support',
                    items: [
                        'Impact investing and sustainable finance initiatives',
                        'Grants and funding for SDG-aligned projects',
                        'Venture capital for social enterprises',
                        'Corporate philanthropy with measurable impact',
                        'Employee matching gift programs'
                    ]
                },
                {
                    title: 'Global Advocacy',
                    items: [
                        'Policy advocacy for sustainable development',
                        'Support for international agreements (Paris Agreement, SDGs)',
                        'Industry leadership on ESG standards',
                        'Participation in global initiatives (UN Global Compact, etc.)',
                        'Amplification of SDG awareness and commitment'
                    ]
                },
                {
                    title: 'Key Performance Indicators',
                    items: [
                        'Active partnerships: Number and impact of collaborations',
                        'Knowledge sharing: Publications, open-source contributions',
                        'Supplier engagement: Percentage participating in sustainability programs',
                        'SDG investment: Annual funding for SDG-aligned initiatives',
                        'Industry leadership: Participation in standards-setting bodies',
                        'Employee engagement: Volunteer hours and skills-based volunteering'
                    ]
                }
            ]
        }
    };

    // Add click handlers to SDG cards
    document.addEventListener('DOMContentLoaded', function() {
        const sdgCards = document.querySelectorAll('.sdg-card');

        sdgCards.forEach(card => {
            // Add hover effect
            card.addEventListener('mouseover', function() {
                this.style.transform = 'scale(1.05)';
            });

            card.addEventListener('mouseout', function() {
                this.style.transform = 'scale(1)';
            });

            // Add click handler
            card.addEventListener('click', function() {
                const sdgNumber = this.getAttribute('data-sdg');
                const sdgData = sdgDetails[sdgNumber];

                if (sdgData) {
                    generateSDGReport(sdgNumber, sdgData);
                } else {
                    alert('Detailed report for SDG ' + sdgNumber + ' is coming soon!');
                }
            });
        });
    });

    function generateSDGReport(sdgNumber, sdgData) {
        const companyName = '${data.companyName}';
        const companyWebsite = '${data.companyWebsite}';

        let sectionsHTML = '';
        sdgData.sections.forEach(section => {
            const itemsList = section.items.map(item => \`<li>\${item}</li>\`).join('');
            sectionsHTML += \`
                <div class="section">
                    <h2>\${section.title}</h2>
                    <ul>
                        \${itemsList}
                    </ul>
                </div>
            \`;
        });

        const reportHTML = \`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SDG \${sdgNumber} Report - \${companyName}</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            line-height: 1.6;
            color: #1f2937;
            background: #f9fafb;
            padding: 2rem;
        }
        .container {
            max-width: 900px;
            margin: 0 auto;
            background: white;
            padding: 3rem;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
            border-radius: 0.5rem;
        }
        .header {
            text-align: center;
            border-bottom: 4px solid \${sdgData.color};
            padding-bottom: 2rem;
            margin-bottom: 2rem;
        }
        .sdg-badge {
            width: 120px;
            height: 120px;
            background: \${sdgData.color};
            color: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 4rem;
            font-weight: 800;
            margin: 0 auto 1rem;
            box-shadow: 0 6px 12px rgba(0,0,0,0.2);
        }
        h1 {
            font-size: 2.5rem;
            color: #1f2937;
            margin-bottom: 0.5rem;
        }
        .subtitle {
            font-size: 1.2rem;
            color: #6b7280;
            font-style: italic;
        }
        .report-meta {
            background: #f3f4f6;
            padding: 1.5rem;
            border-radius: 0.5rem;
            margin-bottom: 2rem;
        }
        .report-meta p {
            margin: 0.5rem 0;
        }
        .report-meta strong {
            color: \${sdgData.color};
        }
        h2 {
            font-size: 1.8rem;
            color: \${sdgData.color};
            margin: 2rem 0 1rem;
            border-bottom: 2px solid #e5e7eb;
            padding-bottom: 0.5rem;
        }
        .section {
            margin: 2rem 0;
        }
        ul {
            list-style: none;
            padding: 0;
            margin: 1rem 0;
        }
        li {
            padding: 0.75rem;
            margin: 0.5rem 0;
            background: #f9fafb;
            border-left: 4px solid \${sdgData.color};
            border-radius: 0.25rem;
        }
        li::before {
            content: '✓ ';
            color: \${sdgData.color};
            font-weight: bold;
            margin-right: 0.5rem;
        }
        .footer {
            margin-top: 3rem;
            padding-top: 2rem;
            border-top: 2px solid #e5e7eb;
            text-align: center;
            color: #6b7280;
            font-size: 0.9rem;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="sdg-badge">\${sdgNumber}</div>
            <h1>\${sdgData.title}</h1>
            <p class="subtitle">\${sdgData.subtitle}</p>
        </div>

        <div class="report-meta">
            <p><strong>Company:</strong> \${companyName}</p>
            <p><strong>Website:</strong> <a href="\${companyWebsite}">\${companyWebsite}</a></p>
            <p><strong>Report Generated:</strong> \${new Date().toLocaleString()}</p>
        </div>

        <div class="section">
            <h2>Executive Summary</h2>
            <p>This detailed report focuses on <strong>\${companyName}</strong>'s contributions to <strong>\${sdgData.title}</strong>. It outlines specific actions, performance indicators, and strategic initiatives aligned with this Sustainable Development Goal.</p>
        </div>

        \${sectionsHTML}

        <div class="section">
            <h2>Next Steps & Recommendations</h2>
            <ul>
                <li>Set specific, measurable targets for this SDG</li>
                <li>Establish baseline measurements and tracking systems</li>
                <li>Engage stakeholders in goal-setting and implementation</li>
                <li>Report progress transparently on an annual basis</li>
                <li>Continuously improve practices and raise ambition over time</li>
            </ul>
        </div>

        <div class="footer">
            <p>This SDG-specific report was generated by ESGSync - ESG Reporting Platform</p>
            <p>&copy; \${new Date().getFullYear()} ESGSync. Making sustainability reporting accessible to all.</p>
        </div>
    </div>
</body>
</html>\`;

        // Open in new window
        const newWindow = window.open('', '_blank');
        newWindow.document.write(reportHTML);
        newWindow.document.close();
    }
    </script>
</body>
</html>`;
    }

    // Action buttons
    const downloadBtn = document.getElementById('download-report');
    const viewPreviewBtn = document.getElementById('view-preview');
    const generateAnotherBtn = document.getElementById('generate-another');

    if (downloadBtn) {
        downloadBtn.addEventListener('click', function() {
            // Generate the HTML report based on report type
            let reportHTML;
            let reportTypeLabel;

            switch(reportData.reportType) {
                case 'e':
                    reportHTML = generateEnvironmentalReport(reportData);
                    reportTypeLabel = 'Environmental';
                    break;
                case 's':
                    reportHTML = generateSocialReport(reportData);
                    reportTypeLabel = 'Social';
                    break;
                case 'g':
                    reportHTML = generateGovernanceReport(reportData);
                    reportTypeLabel = 'Governance';
                    break;
                default:
                    reportHTML = generateHTMLReport(reportData);
                    reportTypeLabel = 'ESG';
            }

            // Create a Blob from the HTML
            const blob = new Blob([reportHTML], { type: 'text/html' });

            // Create a download link
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${reportTypeLabel}_Report_${reportData.companyName.replace(/\s+/g, '_')}_${reportData.jurisdiction.toUpperCase()}_${Date.now()}.html`;

            // Trigger download
            document.body.appendChild(a);
            a.click();

            // Cleanup
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        });
    }

    if (viewPreviewBtn) {
        viewPreviewBtn.addEventListener('click', function() {
            // Generate the HTML report based on report type
            let reportHTML;

            switch(reportData.reportType) {
                case 'e':
                    reportHTML = generateEnvironmentalReport(reportData);
                    break;
                case 's':
                    reportHTML = generateSocialReport(reportData);
                    break;
                case 'g':
                    reportHTML = generateGovernanceReport(reportData);
                    break;
                default:
                    reportHTML = generateHTMLReport(reportData);
            }

            // Open in new window
            const newWindow = window.open('', '_blank');
            newWindow.document.write(reportHTML);
            newWindow.document.close();
        });
    }

    if (generateAnotherBtn) {
        generateAnotherBtn.addEventListener('click', function() {
            // Reset form and show it again
            esgForm.reset();
            reportResult.style.display = 'none';
            companyInputSection.style.display = 'block';
            companyInputSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
        });
    }
});
