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

    // Jurisdiction data
    const jurisdictionData = {
        us: {
            title: 'United States ESG Reporting',
            standards: [
                'SEC Climate Disclosure Rules',
                'US-specific ESG reporting standards',
                'SASB (Sustainability Accounting Standards Board)',
                'Task Force on Climate-related Financial Disclosures (TCFD)',
                'Corporate sustainability and environmental compliance'
            ]
        },
        uk: {
            title: 'United Kingdom ESG Reporting',
            standards: [
                'UK ESG disclosure requirements',
                'Streamlined Energy and Carbon Reporting (SECR)',
                'Modern Slavery Act compliance',
                'FCA Listing Rules on climate-related disclosures',
                'Companies Act 2006 strategic reporting'
            ]
        },
        eu: {
            title: 'European Union ESG Reporting',
            standards: [
                'Corporate Sustainability Reporting Directive (CSRD)',
                'EU Taxonomy for sustainable activities',
                'Sustainable Finance Disclosure Regulation (SFDR)',
                'Non-Financial Reporting Directive (NFRD)',
                'European Sustainability Reporting Standards (ESRS)'
            ]
        },
        china: {
            title: 'China ESG Reporting',
            standards: [
                'Chinese ESG reporting standards',
                'CSRC (China Securities Regulatory Commission) guidelines',
                'Environmental protection disclosure requirements',
                'Social responsibility reporting for listed companies',
                'Green finance and carbon neutrality initiatives'
            ]
        },
        japan: {
            title: 'Japan ESG Reporting',
            standards: [
                'Japanese ESG disclosure frameworks',
                'Tokyo Stock Exchange Corporate Governance Code',
                'TCFD recommendations compliance',
                'Ministry of Economy guidelines',
                'Integrated reporting and sustainability disclosure'
            ]
        },
        korea: {
            title: 'South Korea ESG Reporting',
            standards: [
                'Korean ESG reporting requirements',
                'K-ESG guidelines and standards',
                'Financial Services Commission (FSC) sustainability rules',
                'Korea Exchange (KRX) ESG disclosure',
                'Act on Sustainability Management'
            ]
        },
        singapore: {
            title: 'Singapore ESG Reporting',
            standards: [
                'SGX sustainability reporting requirements',
                'Singapore Exchange Listing Rules',
                'Comply or Explain approach to sustainability',
                'TCFD-aligned climate disclosures',
                'Monetary Authority of Singapore guidelines'
            ]
        },
        global: {
            title: 'Global/Multi-Region ESG Reporting',
            standards: [
                'Cross-jurisdiction reporting coordination',
                'GRI (Global Reporting Initiative) Standards',
                'International Sustainability Standards Board (ISSB)',
                'UN Sustainable Development Goals (SDGs) alignment',
                'Harmonized reporting across multiple regions'
            ]
        }
    };

    // Jurisdiction selection
    const jurisdictionBtns = document.querySelectorAll('.jurisdiction-btn');
    const detailsContainer = document.getElementById('jurisdiction-details');

    jurisdictionBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            jurisdictionBtns.forEach(b => b.classList.remove('active'));

            // Add active class to clicked button
            this.classList.add('active');

            // Get selected region
            const region = this.getAttribute('data-region');
            const data = jurisdictionData[region];

            // Update details display
            if (data) {
                const standardsList = data.standards.map(s => `<li>${s}</li>`).join('');
                detailsContainer.innerHTML = `
                    <div class="details-content">
                        <h3>${data.title}</h3>
                        <ul>
                            ${standardsList}
                        </ul>
                    </div>
                `;
            }
        });
    });
});
