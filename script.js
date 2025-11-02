// Translation data
const translations = {
  en: {
    home: "Home",
    about: "About",
    blog: "Blog",
    videos: "Videos",
    projects: "Projects",
    products: "Products",
    contact: "Contact",
    homeTitle: "Welcome to My Website",
    homeDesc: "Discover my journey, projects, and connect with me.",
    aboutTitle: "About Me",
    blogTitle: "Blog",
    videosTitle: "Videos",
    projectsTitle: "Projects",
    productsTitle: "Digital Products",
    contactTitle: "Contact Me",
    contactDesc: "Feel free to reach out to me through any of my social media channels or send me a message directly.",
    emailBtn: "Send Email",
    footerName: "Medo Hamdani",
    langSwitch: "ع",
    // Blog
    blog1: "Life Lessons from Yemen",
    blog2: "Japanese Anime & Culture",
    blog3: "Personal Journey & Thoughts",
    blog4: "Getting Married in Sydney",
    readMore: "Read More",
    // Videos
    video1: "Arabic OCR Overview 2022",
    video2: "Podcast Episodes",
    watch: "Watch on YouTube",
    // Projects
    project1: "Arabic Digitalization Group",
    project2: "Medo Auto Deals",
    project3: "Smart Lift Innovation",
    project4: "Petroleum Engineering Research",
    learnMore: "Learn More",
    visitWebsite: "Visit Website",
    projectDetails: "Project Details",
    viewPresentations: "View Presentations",
    // Products
    product1: "Arabic Digital Books Collection",
    product2: "Self-Development Guide",
    product3: "Tech Career Bundle",
    buy: "Buy on",
    // About
    aboutPara1: "Mohammed AL-Hamdani also known on the web as Medo Hamdani is a multi talented, motivated self-starter with a passion for helping and motivating others, with strong analytical abilities for problem-solving and managing issues.",
    aboutPara2: "He is a great team player with proven leadership and communication skills. He graduated from UCSI University as a Petroleum Engineer in 2015. During his time at the university, he volunteered in various clubs such as Junior Chamber International (JCI) as a member, Society of Petroleum Engineers (SPE) as president club, and UCSI Taekwondo Club as a vice president and the secretary of the Yemeni Student Association.",
    aboutPara3: "Furthermore, he represented his university locally in South Asia SPE Student Chapter Conference in Malaysia, and internationally in the International Petroleum Technology Conference in China. Furthermore, he joined many workshops and seminars in various topics relevant and not relevant to the course of study. He was awarded the dean's award and got a bronze medal in the Korean Cyber International Genius Inventor Fair for his idea for the smart lift."
  },
  ar: {
    home: "الرئيسية",
    about: "عنّي",
    blog: "المدونة",
    videos: "الفيديوهات",
    projects: "المشاريع",
    products: "المنتجات",
    contact: "اتصل بي",
    homeTitle: "مرحباً بك في موقعي",
    homeDesc: "اكتشف رحلتي، مشاريعي، واتصل بي.",
    aboutTitle: "عنّي",
    blogTitle: "المدونة",
    videosTitle: "الفيديوهات",
    projectsTitle: "المشاريع",
    productsTitle: "المنتجات الرقمية",
    contactTitle: "اتصل بي",
    contactDesc: "لا تتردد في التواصل معي من خلال أي من قنوات التواصل الاجتماعي الخاصة بي أو أرسل لي رسالة مباشرة.",
    emailBtn: "إرسال بريد إلكتروني",
    footerName: "ميدو همداني",
    langSwitch: "EN",
    // Blog
    blog1: "دروس الحياة من اليمن",
    blog2: "الأنمي الياباني والثقافة",
    blog3: "رحلتي الشخصية وأفكاري",
    blog4: "الزواج في سيدني",
    readMore: "اقرأ المزيد",
    // Videos
    video1: "نظرة عامة على التعرف الضوئي على الحروف العربية 2022",
    video2: "حلقات البودكاست",
    watch: "شاهد على يوتيوب",
    // Projects
    project1: "مجموعة الرقمنة العربية",
    project2: "صفقات مدو للسيارات",
    project3: "ابتكار المصعد الذكي",
    project4: "أبحاث هندسة البترول",
    learnMore: "اعرف المزيد",
    visitWebsite: "زيارة الموقع",
    projectDetails: "تفاصيل المشروع",
    viewPresentations: "عرض العروض التقديمية",
    // Products
    product1: "مجموعة الكتب الرقمية العربية",
    product2: "دليل التطوير الذاتي",
    product3: "حزمة مهارات التقنية",
    buy: "اشتر من",
    // About
    aboutPara1: "محمد الهمداني، المعروف على الويب باسم ميدو همداني، هو شخص متعدد المواهب، متحفز ومبدئي ذاتي بشغف لمساعدة وتحفيز الآخرين، مع قدرات تحليلية قوية لحل المشكلات وإدارة القضايا.",
    aboutPara2: "هو لاعب فريق رائع بمهارات قيادية وتواصل مثبتة. تخرج من جامعة UCSI كمهندس بترول في عام 2015. خلال فترة دراسته في الجامعة، تطوع في نوادي مختلفة مثل الغرفة الدولية للشباب (JCI) كعضو، وجمعية مهندسي البترول (SPE) كرئيس نادي، ونادي التايكوندو UCSI كنائب رئيس وأمين جمعية الطلاب اليمنيين.",
    aboutPara3: "علاوة على ذلك، مثل جامعته محلياً في مؤتمر جمعية طلاب جنوب آسيا SPE في ماليزيا، ودولياً في المؤتمر الدولي لتقنية البترول في الصين. علاوة على ذلك، انضم إلى العديد من ورش العمل والدورات في مواضيع مختلفة ذات صلة وغير ذات صلة بالمسار الدراسي. حصل على جائزة العميد وحصل على ميدالية برونزية في معرض المخترعين العباقرة الدولي السيبراني الكوري لفكرته للمصعد الذكي."
  }
};

let currentLang = 'en';

// Update content based on language
function updateContent(lang) {
  currentLang = lang;
  const t = translations[lang];
  
  // Update document direction and language
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  document.documentElement.lang = lang;
  
  // Update navigation
  document.querySelectorAll('[data-en]').forEach(el => {
    const key = el.dataset.en;
    if (t[key]) {
      el.textContent = t[key];
    }
  });
  
  // Update all elements with IDs
  Object.keys(t).forEach(key => {
    const element = document.getElementById(key);
    if (element) {
      element.textContent = t[key];
    }
  });
  
  // Update language switch button
  const langSwitch = document.getElementById('langSwitch');
  if (langSwitch) {
    langSwitch.textContent = t.langSwitch;
  }
  
  // Update read more links
  for (let i = 1; i <= 4; i++) {
    const readMoreElement = document.getElementById(`readMore${i}`);
    if (readMoreElement) {
      readMoreElement.innerHTML = `${t.readMore} <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 17L17 7M17 7H7M17 7V17"/></svg>`;
    }
  }
  
  // Update watch links
  for (let i = 1; i <= 2; i++) {
    const watchElement = document.getElementById(`watch${i}`);
    if (watchElement) {
      watchElement.innerHTML = `${t.watch} <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 17L17 7M17 7H7M17 7V17"/></svg>`;
    }
  }
  
  // Update project links
  const projectLinks = {
    learnMore1: t.learnMore,
    learnMore2: t.visitWebsite,
    learnMore3: t.projectDetails,
    learnMore4: t.viewPresentations
  };
  
  Object.keys(projectLinks).forEach(key => {
    const element = document.getElementById(key);
    if (element) {
      element.innerHTML = `${projectLinks[key]} <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 17L17 7M17 7H7M17 7V17"/></svg>`;
    }
  });
  
  // Update buy buttons
  for (let i = 1; i <= 3; i++) {
    const buyElement = document.getElementById(`buy${i}`);
    if (buyElement) {
      const platform = i === 2 ? 'NZMLY' : 'Gumroad';
      buyElement.innerHTML = `${t.buy} ${platform} <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 17L17 7M17 7H7M17 7V17"/></svg>`;
    }
  }
  
  // Update email button
  const emailBtn = document.getElementById('emailBtn');
  if (emailBtn) {
    emailBtn.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg> ${t.emailBtn}`;
  }
}

// Language switch functionality
document.addEventListener('DOMContentLoaded', function() {
  const langSwitch = document.getElementById('langSwitch');
  if (langSwitch) {
    langSwitch.addEventListener('click', () => {
      const newLang = currentLang === 'en' ? 'ar' : 'en';
      updateContent(newLang);
    });
  }

  // Mobile menu functionality
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.mobile-menu a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
      });
    });
  }

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

  // Add fade-in animation on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Observe all sections
  document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(section);
  });

  // Initialize
  updateContent('en');
});
