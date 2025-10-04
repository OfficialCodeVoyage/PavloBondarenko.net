import Script from 'next/script';

export default function JsonLd() {
  const structuredData = [
    // Enhanced Person Schema with work history and education
    {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Pavlo Bondarenko',
      url: 'https://pavlobondarenko.net',
      jobTitle: 'Associate Product Manager',
      worksFor: {
        '@type': 'Organization',
        name: 'Xe.com',
        url: 'https://www.xe.com',
        description: 'Leading currency services and international money transfers',
      },
      image: 'https://pavlobondarenko.net/images/about_me_profile_pic.png',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Denver',
        addressRegion: 'CO',
        addressCountry: 'US',
      },
      alumniOf: [
        {
          '@type': 'EducationalOrganization',
          name: 'University of North Texas',
          url: 'https://www.unt.edu',
        },
        {
          '@type': 'EducationalOrganization',
          name: 'Odesa Polytechnic National University',
          url: 'https://op.edu.ua/en',
        },
      ],
      hasOccupation: [
        {
          '@type': 'Occupation',
          name: 'Associate Product Manager',
          occupationLocation: {
            '@type': 'City',
            name: 'Denver, Colorado',
          },
          estimatedSalary: {
            '@type': 'MonetaryAmountDistribution',
            name: 'Product Manager Salary',
            currency: 'USD',
          },
        },
      ],
      sameAs: [
        'https://github.com/OfficialCodeVoyage',
        'https://www.linkedin.com/in/mrbondarenko/',
        'https://www.instagram.com/pasha.369.bond/',
        'https://www.youtube.com/@OfficialCodeVoyage',
      ],
      knowsAbout: [
        'Product Management',
        'Product Strategy',
        'Web Development',
        'Cloud Computing',
        'Azure',
        'AWS',
        'GCP',
        'Python',
        'React',
        'Next.js',
        'JavaScript',
        'TypeScript',
        'Frontend Development',
        'Backend Development',
        'AI Development',
        'Machine Learning',
        'Healthcare Technology',
        'Fintech',
      ],
    },

    // WebSite Schema
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'Pavlo Bondarenko Portfolio',
      url: 'https://pavlobondarenko.net',
      description: 'Personal portfolio and project showcase of Pavlo Bondarenko - Associate Product Manager at Xe.com',
      author: {
        '@type': 'Person',
        name: 'Pavlo Bondarenko',
      },
      inLanguage: 'en-US',
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: 'https://pavlobondarenko.net/?search={search_term_string}',
        },
        'query-input': 'required name=search_term_string',
      },
    },

    // ProfilePage Schema
    {
      '@context': 'https://schema.org',
      '@type': 'ProfilePage',
      mainEntity: {
        '@type': 'Person',
        name: 'Pavlo Bondarenko',
        url: 'https://pavlobondarenko.net',
      },
    },

    // BreadcrumbList Schema for site navigation
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://pavlobondarenko.net',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'About',
          item: 'https://pavlobondarenko.net/about',
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Projects',
          item: 'https://pavlobondarenko.net/projects',
        },
        {
          '@type': 'ListItem',
          position: 4,
          name: 'Contact',
          item: 'https://pavlobondarenko.net/contact',
        },
      ],
    },

    // ItemList Schema for Projects Portfolio
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Pavlo Bondarenko Projects Portfolio',
      description: '76+ innovative projects in AI, healthcare, fintech, and more',
      numberOfItems: 10,
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          item: {
            '@type': 'SoftwareApplication',
            name: 'PrescribeRX',
            description: 'Advanced Prescription Management mobile application',
            applicationCategory: 'HealthApplication',
            operatingSystem: 'iOS, Android',
            url: 'https://devpost.com/software/prescriberx',
            screenshot: 'https://pavlobondarenko.net/images/projects/update5172025/v1/prescriberx.png',
          },
        },
        {
          '@type': 'ListItem',
          position: 2,
          item: {
            '@type': 'SoftwareApplication',
            name: 'COUGAR (UH) Bot',
            description: 'University Helper AI Bot using RAG technology',
            applicationCategory: 'EducationalApplication',
            url: 'https://devpost.com/software/tbd-tmzb5j',
            screenshot: 'https://pavlobondarenko.net/images/projects/update5172025/v1/cougargpt.png',
          },
        },
        {
          '@type': 'ListItem',
          position: 3,
          item: {
            '@type': 'SoftwareApplication',
            name: 'NurseAI',
            description: 'Emergency Button with AI features for healthcare',
            applicationCategory: 'HealthApplication',
            url: 'https://devpost.com/software/nurseai-gr7p84',
            screenshot: 'https://pavlobondarenko.net/images/projects/update5172025/v1/nurseai.png',
          },
        },
        {
          '@type': 'ListItem',
          position: 4,
          item: {
            '@type': 'SoftwareApplication',
            name: 'AMBER ALERT + TESLA',
            description: 'Child Safety & Vehicle Integration using OpenCV and PyTorch',
            applicationCategory: 'SafetyApplication',
            url: 'https://devpost.com/software/pavlo_bondarenko_hello_world',
            screenshot: 'https://pavlobondarenko.net/images/projects/update5172025/v1/ambertesla.png',
          },
        },
        {
          '@type': 'ListItem',
          position: 5,
          item: {
            '@type': 'SoftwareApplication',
            name: 'SizeMe: eCommerce',
            description: 'Virtual Fitting Room for Online Shopping using OpenCV and Azure Cloud',
            applicationCategory: 'ShoppingApplication',
            url: 'https://devpost.com/software/e-commerce-app-b5lrem',
            screenshot: 'https://pavlobondarenko.net/images/projects/update5172025/v1/SizeMeProject.png',
          },
        },
        {
          '@type': 'ListItem',
          position: 6,
          item: {
            '@type': 'SoftwareApplication',
            name: 'AstrosDebugger',
            description: 'Data-Driven Debugging Tool - Data Science Project',
            applicationCategory: 'DeveloperApplication',
            url: 'https://devpost.com/software/tbd-znafp1',
            screenshot: 'https://pavlobondarenko.net/images/projects/update5172025/v1/astros.png',
          },
        },
        {
          '@type': 'ListItem',
          position: 7,
          item: {
            '@type': 'SoftwareApplication',
            name: '$SeeTheFuture',
            description: 'AI Stock Market Predictor - Fintech Application',
            applicationCategory: 'FinanceApplication',
            url: 'https://devpost.com/software/seethefuture',
            screenshot: 'https://pavlobondarenko.net/images/projects/update5172025/v1/seethefuture.png',
          },
        },
        {
          '@type': 'ListItem',
          position: 8,
          item: {
            '@type': 'SoftwareApplication',
            name: 'RestoreIO',
            description: 'After Surgery Recovery Assistant using LLM and OpenCV',
            applicationCategory: 'HealthApplication',
            url: 'https://devpost.com/software/tbd-ir3qd5',
            screenshot: 'https://pavlobondarenko.net/images/projects/update5172025/v1/restoreio.png',
          },
        },
        {
          '@type': 'ListItem',
          position: 9,
          item: {
            '@type': 'SoftwareApplication',
            name: 'MemoryPalace',
            description: 'Helping seniors preserve their memories - LLM + Game',
            applicationCategory: 'HealthApplication',
            url: 'https://devpost.com/software/memory-palace-bnofj5',
            screenshot: 'https://pavlobondarenko.net/images/projects/update5172025/v1/memorypalace.png',
          },
        },
      ],
    },

    // Organization Schema - Xe.com (Current Employer)
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Xe.com',
      url: 'https://www.xe.com',
      description: 'Leading currency services and international money transfers',
      employee: {
        '@type': 'Person',
        name: 'Pavlo Bondarenko',
        jobTitle: 'Associate Product Manager',
      },
    },

    // Organization Schema - QIT Software (Previous Employer)
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'QIT Software',
      url: 'https://qit.software/',
      description: 'Software development and cloud solutions company',
      alumni: {
        '@type': 'Person',
        name: 'Pavlo Bondarenko',
      },
    },

    // EducationalOrganization Schema - University of North Texas
    {
      '@context': 'https://schema.org',
      '@type': 'EducationalOrganization',
      name: 'University of North Texas',
      url: 'https://www.unt.edu',
      alumni: {
        '@type': 'Person',
        name: 'Pavlo Bondarenko',
      },
    },

    // EducationalOrganization Schema - Odesa Polytechnic
    {
      '@context': 'https://schema.org',
      '@type': 'EducationalOrganization',
      name: 'Odesa Polytechnic National University',
      url: 'https://op.edu.ua/en',
      alumni: {
        '@type': 'Person',
        name: 'Pavlo Bondarenko',
      },
    },
  ];

  return (
    <Script
      id="structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      strategy="afterInteractive"
    />
  );
} 