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
            <div class="logo">AI for Good</div>
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
            <p>This report was generated by AI for Good - ESG Reporting Platform</p>
            <p>For more information, visit our platform or contact our ESG specialists</p>
            <p>&copy; ${new Date().getFullYear()} AI for Good. Making sustainability reporting accessible to all.</p>
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
            <p>This SDG-specific report was generated by AI for Good - ESG Reporting Platform</p>
            <p>&copy; \${new Date().getFullYear()} AI for Good. Making sustainability reporting accessible to all.</p>
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
            // Generate the HTML report
            const reportHTML = generateHTMLReport(reportData);

            // Create a Blob from the HTML
            const blob = new Blob([reportHTML], { type: 'text/html' });

            // Create a download link
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `ESG_Report_${reportData.companyName.replace(/\s+/g, '_')}_${reportData.jurisdiction.toUpperCase()}_${Date.now()}.html`;

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
            // Generate the HTML report
            const reportHTML = generateHTMLReport(reportData);

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
