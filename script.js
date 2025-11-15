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

            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem; margin-top: 2rem;">
                <div style="padding: 1.5rem; background: #f9fafb; border-left: 4px solid #E5243B; border-radius: 0.5rem;">
                    <h3 style="color: #E5243B; margin-bottom: 0.5rem;">SDG 7: Affordable and Clean Energy</h3>
                    <p style="margin: 0;">Potential alignment through renewable energy adoption and energy efficiency programs.</p>
                </div>
                <div style="padding: 1.5rem; background: #f9fafb; border-left: 4px solid #4C9F38; border-radius: 0.5rem;">
                    <h3 style="color: #4C9F38; margin-bottom: 0.5rem;">SDG 8: Decent Work and Economic Growth</h3>
                    <p style="margin: 0;">Contribution through fair labor practices, employee wellbeing, and sustainable economic activities.</p>
                </div>
                <div style="padding: 1.5rem; background: #f9fafb; border-left: 4px solid #FD6925; border-radius: 0.5rem;">
                    <h3 style="color: #FD6925; margin-bottom: 0.5rem;">SDG 9: Industry, Innovation and Infrastructure</h3>
                    <p style="margin: 0;">Support through innovative business practices and sustainable infrastructure development.</p>
                </div>
                <div style="padding: 1.5rem; background: #f9fafb; border-left: 4px solid #DD1367; border-radius: 0.5rem;">
                    <h3 style="color: #DD1367; margin-bottom: 0.5rem;">SDG 10: Reduced Inequalities</h3>
                    <p style="margin: 0;">Advancement through diversity, equity, and inclusion initiatives in the workplace.</p>
                </div>
                <div style="padding: 1.5rem; background: #f9fafb; border-left: 4px solid #FD9D24; border-radius: 0.5rem;">
                    <h3 style="color: #FD9D24; margin-bottom: 0.5rem;">SDG 12: Responsible Consumption and Production</h3>
                    <p style="margin: 0;">Implementation of circular economy principles and waste reduction strategies.</p>
                </div>
                <div style="padding: 1.5rem; background: #f9fafb; border-left: 4px solid #3F7E44; border-radius: 0.5rem;">
                    <h3 style="color: #3F7E44; margin-bottom: 0.5rem;">SDG 13: Climate Action</h3>
                    <p style="margin: 0;">Direct contribution through carbon reduction targets and climate mitigation efforts.</p>
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
