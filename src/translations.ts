/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Language = 'en' | 'pt';

export const translations = {
  en: {
    // Navigation
    navHome: "Home",
    navAbout: "About Us",
    navServices: "Our Services",
    navPlans: "Membership Plans",
    navApply: "Apply Online",
    navFAQ: "FAQ",
    navTeam: "Our Team",
    navContact: "Contact Us",
    navAdmin: "Admin Dashboard",
    tagline: "We Care. We Transport. We Respect.",
    routeInfo: "Dedicated cross-border coverage and transport from South Africa to Inhambane, Mozambique.",
    
    // Common buttons
    btnApplyNow: "Apply Online Now",
    btnLearnMore: "Learn More",
    btnSubmit: "Submit Application",
    btnSubmitting: "Submitting...",
    btnNext: "Next Step",
    btnBack: "Back",
    btnCallNow: "Call Us Now",
    btnWhatsApp: "Chat on WhatsApp",
    
    // Hero
    heroTitle: "Dignified Cross-Border Funeral Cover & Transport",
    heroSubtitle: "Protecting families working in South Africa with safe, compassionate, and seamless transport support to Inhambane, Mozambique.",
    trustBadge: "100% Online Membership Application - No Office Visit Required",
    
    // Stats / Info Banner
    bannerRoute: "Our Route: South Africa to Inhambane, Mozambique",
    bannerExperience: "Trusted Experience",
    bannerSupport: "24/7 Member Care",
    bannerOnline: "Direct Online Enrollment",

    // About Us
    aboutTitle: "About Care Beyond Borders",
    aboutSubtitle: "Bridging Borders with Care, Dignity, and Trust",
    aboutP1: "At Care Beyond Borders, we understand the challenges of being far from home. We specialize in providing comprehensive funeral insurance, repatriation, sick patient transit, and family support from any location in South Africa to the beautiful province of Inhambane, Mozambique.",
    aboutP2: "Our mission is built on three pillars: compassion, professional transport, and deep respect for the families we serve. By eliminating the need to visit physical offices, our digital membership system allows you to secure protection for your loved ones with immediate effect.",
    aboutValue1: "Compassionate Care",
    aboutValue1Desc: "We walk alongside you in difficult times, providing emotional and logistics support.",
    aboutValue2: "Dignified Transport",
    aboutValue2Desc: "Our high-end, clean hearse fleet and family minibuses guarantee absolute comfort.",
    aboutValue3: "Bilingual Administration",
    aboutValue3Desc: "Providing support in both English and Portuguese to make processes easy and clear.",

    // Services
    servicesTitle: "Our Premium Services",
    servicesSubtitle: "Comprehensive cross-border transport and coverage solutions engineered for your peace of mind.",
    serviceFuneral: "Funeral Transport (Hearse)",
    serviceFuneralDesc: "Dignified, professional repatriation and transportation of deceased members from anywhere in South Africa to Inhambane in specialized Mercedes Benz hearses.",
    serviceSick: "Sick Person Transport & Support",
    serviceSickDesc: "Comfortable and attentive non-emergency transport for ill members requiring specialized travel back home or to healthcare facilities.",
    serviceRecovery: "Recovery Assistance Benefit (40,000 MT)",
    serviceRecoveryDesc: "An immediate financial relief payout of 40,000 Meticais to cover local expenses, support families, and facilitate logistics in Mozambique.",
    serviceBorder: "Cross-Border Assistance",
    serviceBorderDesc: "Full administrative, customs, and immigration handling. We manage all border paperwork, clearances, and cross-country compliance seamlessly.",
    serviceFamily: "Family Transport (Minibus)",
    serviceFamilyDesc: "Comfortable, safe, and spacious Toyota minibus transport for accompanying family members on their journeys between South Africa and Mozambique.",

    // Plans
    plansTitle: "Our Membership Plans",
    plansSubtitle: "Affordable premium coverage for individuals, families, and seniors with direct online application.",
    planIndividualName: "Individual Membership",
    planIndividualPrice: "R300",
    planIndividualCoverage: "1 Main Member",
    planIndividualDesc: "Designed for individuals working in South Africa seeking complete, individual funeral transit and assistance cover to Inhambane.",
    planFamilyName: "Family Membership",
    planFamilyPrice: "R600",
    planFamilyCoverage: "Father, Mother & up to 3 Children",
    planFamilyDesc: "Comprehensive group coverage for a family unit (maximum 5 immediate members) ensuring everyone travels under full protection.",
    planSeniorName: "Senior Membership",
    planSeniorPrice: "R500",
    planSeniorCoverage: "1 Senior Member (60+ Years)",
    planSeniorDesc: "Tailored cover for elders aged 60 and above with priority assistance, transport support, and customized care.",
    planPerMonth: "per month",
    planFeatureRepat: "Full Cross-Border Repatriation",
    planFeatureSupport: "24/7 Coordination Support",
    planFeatureBorder: "Border Clearance Assistance",
    planFeatureRecovery: "40,000 MT Cash Recovery Benefit",
    planFeatureNoPaperwork: "100% Online Enrollment",

    // Application Form
    formTitle: "Online Membership Application",
    formSubtitle: "Apply online and secure coverage immediately. No physical office visit required.",
    formStep1: "Plan & Personal Info",
    formStep2: "Contact & Address",
    formStep3: "Beneficiary",
    formStep4: "Family Members",
    formStep5: "Documents Upload",
    formStep6: "Payment & Signature",
    
    // Form fields
    fieldPlanSelected: "Selected Plan",
    fieldFullName: "Full Name",
    fieldIdPassport: "ID / Passport Number",
    fieldDob: "Date of Birth",
    fieldGender: "Gender",
    fieldGenderMale: "Male",
    fieldGenderFemale: "Female",
    fieldGenderOther: "Other",
    fieldNationality: "Nationality",
    fieldMaritalStatus: "Marital Status",
    fieldMaritalSingle: "Single",
    fieldMaritalMarried: "Married",
    fieldMaritalWidowed: "Widowed",
    fieldMaritalDivorced: "Divorced",
    
    fieldMobile: "Mobile Number",
    fieldAltPhone: "Alternative Phone Number",
    fieldEmail: "Email Address",
    fieldStreet: "Street Address",
    fieldCity: "City",
    fieldProvince: "Province",
    fieldPostalCode: "Postal Code",
    fieldCountry: "Country",
    
    fieldBeneficiaryTitle: "Beneficiary Details",
    fieldBeneficiarySub: "The person designated to receive benefits or act as primary contact.",
    fieldRelationship: "Relationship",
    fieldPhone: "Phone Number",
    
    fieldNextOfKinTitle: "Next of Kin Details",
    fieldNextOfKinSub: "An alternative family contact in case of emergency.",
    
    fieldFamilyTitle: "Family Member Details (Max 5)",
    fieldFamilySub: "Enter details for immediate family members included in your Family Membership.",
    fieldAddFamilyMember: "Add Family Member",
    fieldRemove: "Remove",
    
    fieldDocsTitle: "Upload Supporting Documents",
    fieldDocsSub: "Please attach clear copies of your documents. You can drag and drop or click to choose files.",
    fieldIdDoc: "ID / Passport Document",
    fieldPhotoDoc: "Passport Photo",
    fieldResDoc: "Proof of Residence (e.g. utility bill)",
    fieldUploadSuccess: "File uploaded successfully",
    
    fieldPaymentTitle: "Choose Monthly Payment Method",
    fieldPaymentSub: "Monthly premiums must be paid on or before the 1st of each month.",
    fieldPaymentEFT: "EFT (Electronic Funds Transfer)",
    fieldPaymentBank: "Bank Transfer",
    fieldPaymentDebit: "Debit Order",
    fieldPaymentCash: "Cash Payment",
    
    fieldDeclarationTitle: "Legal Declaration",
    fieldDeclarationCheck: "I declare that the information provided is true and correct and I agree to the Terms and Conditions.",
    fieldSignatureTitle: "Digital Signature",
    fieldSignatureSub: "Please draw your signature inside the box below using your mouse or touch screen.",
    fieldClearSignature: "Clear Signature",
    
    // Application post-submit
    submitSuccessTitle: "Application Submitted Successfully!",
    submitSuccessNum: "Your Application Number:",
    submitSuccessP1: "Thank you for applying. Your application has been successfully received.",
    submitSuccessP2: "Our administration team is reviewing your documents. An automated copy has been securely logged and dispatched to our regional processing emails:",
    submitSuccessP3: "A confirmation email containing your application details, policy summary, and banking details has been sent to your email address:",
    submitSuccessBtn: "Return to Home",
    submitAdminView: "View in Admin Portal",

    // Team
    teamTitle: "Our Dedicated Leadership Team",
    teamSubtitle: "The professionals making cross-border support reliable, safe, and dignified.",
    teamSupport: "Operations & Member Support",
    teamCoordinator: "Cross-Border Coordinator",
    teamRelations: "Client Relations & Administration",
    
    // Contact Us
    contactTitle: "Contact Our Offices",
    contactSubtitle: "Get in touch with us today. We are always ready to assist you in English and Portuguese.",
    contactOffice: "Headquarters Address",
    contactOfficeVal: "13 Oorbietjie Street, Nimrod Park, Glen Marais, Kempton Park, 1619, South Africa",
    contactFormTitle: "Send Us a Message",
    contactFormName: "Your Full Name",
    contactFormEmail: "Your Email Address",
    contactFormPhone: "Your Phone Number",
    contactFormSubject: "Subject",
    contactFormMsg: "Your Message",
    contactFormBtn: "Send Message",
    contactFormSuccess: "Thank you for contacting Care Beyond Borders. Our team will get back to you shortly.",
    contactFormError: "Something went wrong. Please try again.",

    // FAQ
    faqTitle: "Frequently Asked Questions",
    faqSubtitle: "Find immediate answers regarding our coverage, cross-border transport, and online applications.",
    faqQ1: "Can I apply completely online without visiting your offices?",
    faqA1: "Yes, absolutely! Care Beyond Borders features a fully digital application system. You can complete your personal details, list family members, upload your ID/Passport, sign digitally on your device, and submit your application instantly. No office visits are necessary.",
    faqQ2: "What areas do you transport to and from?",
    faqA2: "We specialize in transportation and cover from any location in South Africa (such as Gauteng, Mpumalanga, etc.) directly to all districts and cities within the Inhambane Province in Mozambique.",
    faqQ3: "How does the Recovery Assistance Benefit work?",
    faqA3: "Our Recovery Assistance Benefit provides an immediate payout of 40,000 MT (Meticais) to the designated beneficiary upon claim approval. This is aimed at supporting local funeral logistics and easing financial pressure for the family in Mozambique.",
    faqQ4: "What payment methods are supported for premiums?",
    faqA4: "You can pay your monthly membership premiums through EFT, Bank Transfer, Debit Order, or direct Cash. Upon successful registration, you will receive our banking details.",
    faqQ5: "How long does claims processing take?",
    faqA5: "Our dedicated team operates 24/7. Cross-border repatriation clearances and logistics are typically initiated within hours of receiving a claim notification, ensuring your family is supported without delay.",

    // Footer & legal
    footerRights: "All Rights Reserved. Registered Insurance Agent & Transport Provider.",
    footerLegalLinks: "Privacy Policy | Terms & Conditions",
    privacyTitle: "Privacy Policy",
    termsTitle: "Terms & Conditions",
    closeBtn: "Close",
    
    // Legal Texts
    privacyText: "Care Beyond Borders is committed to protecting your personal information. All documents, including ID copies, proof of residence, and digital signatures uploaded via our membership portal, are securely encrypted and used strictly for policy underwriting and administrative coordination. We will never share or sell your personal data to third parties.",
    termsText: "By registering for a membership with Care Beyond Borders, you declare that all information entered is accurate. Premium payments are due monthly by the 1st. Failure to pay premiums for two consecutive months may result in a suspension of coverage. Funeral and repatriation benefits are subject to a 3-month waiting period for natural causes, with immediate cover active for accidental incidents. Cross-border transport routes are strictly bound from South Africa destinations to the Inhambane Province in Mozambique."
  },
  pt: {
    // Navigation
    navHome: "Início",
    navAbout: "Sobre Nós",
    navServices: "Serviços",
    navPlans: "Planos de Adesão",
    navApply: "Candidatar-se Online",
    navFAQ: "Perguntas Frequentes",
    navTeam: "Equipa",
    navContact: "Contacte-nos",
    navAdmin: "Painel Admin",
    tagline: "Cuidamos. Transportamos. Respeitamos.",
    routeInfo: "Cobertura e transporte transfronteiriço dedicado da África do Sul para Inhambane, Moçambique.",
    
    // Common buttons
    btnApplyNow: "Candidatar-se Online Agora",
    btnLearnMore: "Saber Mais",
    btnSubmit: "Enviar Candidatura",
    btnSubmitting: "A Enviar...",
    btnNext: "Próximo Passo",
    btnBack: "Voltar",
    btnCallNow: "Ligue-nos Agora",
    btnWhatsApp: "Conversar no WhatsApp",
    
    // Hero
    heroTitle: "Cobertura Funerária e Transporte Transfronteiriço de Dignidade",
    heroSubtitle: "Protegendo famílias que trabalham na África do Sul com transporte seguro, compassivo e contínuo para Inhambane, Moçambique.",
    trustBadge: "Inscrição 100% Online de Membro - Sem Necessidade de Ir ao Escritório",
    
    // Stats / Info Banner
    bannerRoute: "A Nossa Rota: África do Sul para Inhambane, Moçambique",
    bannerExperience: "Experiência de Confiança",
    bannerSupport: "Atendimento 24/7",
    bannerOnline: "Inscrição Direta Online",

    // About Us
    aboutTitle: "Sobre a Care Beyond Borders",
    aboutSubtitle: "Unindo Fronteiras com Cuidado, Dignidade e Confiança",
    aboutP1: "Na Care Beyond Borders, compreendemos os desafios de estar longe de casa. Especializamo-nos em fornecer seguros de funeral abrangentes, repatriação, trânsito de doentes e apoio familiar de qualquer local da África do Sul para a bela província de Inhambane, Moçambique.",
    aboutP2: "A nossa missão baseia-se em três pilares: compaixão, transporte profissional e profundo respeito pelas famílias que servimos. Ao eliminar a necessidade de visitar escritórios físicos, o nosso sistema digital de adesão permite-lhe garantir proteção imediata para os seus entes queridos.",
    aboutValue1: "Cuidado Compassivo",
    aboutValue1Desc: "Caminhamos consigo nos momentos difíceis, prestando apoio logístico e emocional de coração.",
    aboutValue2: "Transporte Digno",
    aboutValue2Desc: "A nossa frota de carros funerários (Mercedes Benz) modernos e limpos e miniautocarros familiares garantem conforto absoluto.",
    aboutValue3: "Administração Bilingue",
    aboutValue3Desc: "Apoio em Inglês e Português para tornar todos os processos fáceis, transparentes e claros.",

    // Services
    servicesTitle: "Os Nossos Serviços Premium",
    servicesSubtitle: "Soluções completas de transporte transfronteiriço e cobertura concebidas para a sua total paz de espírito.",
    serviceFuneral: "Transporte Funerário (Carro Funerário)",
    serviceFuneralDesc: "Repatriação digna, profissional e transporte de membros falecidos de qualquer ponto da África do Sul para Inhambane em carros funerários Mercedes Benz especializados.",
    serviceSick: "Transporte de Doentes e Apoio",
    serviceSickDesc: "Transporte confortável e atento para membros doentes que necessitam de viajar de volta para casa ou para instalações de saúde em Moçambique.",
    serviceRecovery: "Benefício de Assistência de Recuperação (40.000 MT)",
    serviceRecoveryDesc: "Um pagamento de apoio financeiro imediato de 40.000 Meticais para cobrir despesas locais, apoiar as famílias e facilitar os trâmites em Moçambique.",
    serviceBorder: "Assistência Transfronteiriça",
    serviceBorderDesc: "Gestão administrativa completa, alfandegária e de imigração. Tratamos de toda a documentação fronteiriça e conformidade entre os países.",
    serviceFamily: "Transporte Familiar (Miniautocarro)",
    serviceFamilyDesc: "Transporte confortável, seguro e espaçoso em carrinhas Toyota para familiares acompanhantes nas suas viagens entre a África do Sul e Moçambique.",

    // Plans
    plansTitle: "Os Nossos Planos de Adesão",
    plansSubtitle: "Cobertura premium acessível para indivíduos, famílias e idosos com inscrição online direta.",
    planIndividualName: "Plano Individual",
    planIndividualPrice: "R300",
    planIndividualCoverage: "1 Membro Principal",
    planIndividualDesc: "Concebido para indivíduos que trabalham na África do Sul e procuram cobertura completa de trânsito e assistência funerária para Inhambane.",
    planFamilyName: "Plano Familiar",
    planFamilyPrice: "R600",
    planFamilyCoverage: "Pai, Mãe & até 3 Filhos",
    planFamilyDesc: "Cobertura de grupo abrangente para a unidade familiar (máximo 5 membros imediatos) garantindo que todos viajem sob total proteção.",
    planSeniorName: "Plano Sénior",
    planSeniorPrice: "R500",
    planSeniorCoverage: "1 Membro Sénior (60+ Anos)",
    planSeniorDesc: "Cobertura personalizada para idosos com idade igual ou superior a 60 anos com assistência prioritária, suporte de transporte e atenção dedicada.",
    planPerMonth: "por mês",
    planFeatureRepat: "Repatriação Transfronteiriça Completa",
    planFeatureSupport: "Coordenação e Apoio 24/7",
    planFeatureBorder: "Assistência na Liberação Fronteiriça",
    planFeatureRecovery: "Benefício de Assistência de 40.000 MT",
    planFeatureNoPaperwork: "Inscrição 100% Online",

    // Application Form
    formTitle: "Formulário de Inscrição Online",
    formSubtitle: "Candidatar-se online e garantir cobertura imediatamente. Sem necessidade de visitas ao escritório.",
    formStep1: "Plano & Dados Pessoais",
    formStep2: "Contacto & Endereço",
    formStep3: "Beneficiário",
    formStep4: "Membros da Família",
    formStep5: "Carregar Documentos",
    formStep6: "Pagamento & Assinatura",
    
    // Form fields
    fieldPlanSelected: "Plano Selecionado",
    fieldFullName: "Nome Completo",
    fieldIdPassport: "Número do BI / Passaporte",
    fieldDob: "Data de Nascimento",
    fieldGender: "Género",
    fieldGenderMale: "Masculino",
    fieldGenderFemale: "Feminino",
    fieldGenderOther: "Outro",
    fieldNationality: "Nacionalidade",
    fieldMaritalStatus: "Estado Civil",
    fieldMaritalSingle: "Solteiro(a)",
    fieldMaritalMarried: "Casado(a)",
    fieldMaritalWidowed: "Viúvo(a)",
    fieldMaritalDivorced: "Divorciado(a)",
    
    fieldMobile: "Número de Telemóvel",
    fieldAltPhone: "Contacto Alternativo",
    fieldEmail: "Endereço de E-mail",
    fieldStreet: "Endereço Residencial (Rua)",
    fieldCity: "Cidade",
    fieldProvince: "Província",
    fieldPostalCode: "Código Postal",
    fieldCountry: "País",
    
    fieldBeneficiaryTitle: "Detalhes do Beneficiário",
    fieldBeneficiarySub: "A pessoa designada para receber os benefícios ou ser o principal contacto.",
    fieldRelationship: "Grau de Parentesco",
    fieldPhone: "Número de Telefone",
    
    fieldNextOfKinTitle: "Detalhes do Próximo de Parentesco",
    fieldNextOfKinSub: "Contacto familiar alternativo para casos de emergência.",
    
    fieldFamilyTitle: "Detalhes dos Membros da Família (Máx. 5)",
    fieldFamilySub: "Insira os detalhes dos membros da família incluídos no seu Plano Familiar.",
    fieldAddFamilyMember: "Adicionar Membro da Família",
    fieldRemove: "Remover",
    
    fieldDocsTitle: "Carregar Documentos de Apoio",
    fieldDocsSub: "Por favor, anexe cópias claras dos seus documentos. Pode arrastar e soltar ou clicar para escolher os ficheiros.",
    fieldIdDoc: "Documento de Identidade / Passaporte",
    fieldPhotoDoc: "Foto tipo passe",
    fieldResDoc: "Comprovativo de Residência (ex: fatura de serviços)",
    fieldUploadSuccess: "Ficheiro carregado com sucesso",
    
    fieldPaymentTitle: "Escolher Método de Pagamento Mensal",
    fieldPaymentSub: "As mensalidades devem ser pagas até ao dia 1 de cada mês.",
    fieldPaymentEFT: "EFT (Transferência Eletrónica)",
    fieldPaymentBank: "Transferência Bancária",
    fieldPaymentDebit: "Débito Direto",
    fieldPaymentCash: "Pagamento em Dinheiro",
    
    fieldDeclarationTitle: "Declaração Legal",
    fieldDeclarationCheck: "Declaro que as informações fornecidas são verdadeiras e corretas e aceito os Termos e Condições.",
    fieldSignatureTitle: "Assinatura Digital",
    fieldSignatureSub: "Por favor, desenhe a sua assinatura dentro da caixa abaixo usando o rato ou ecrã tátil.",
    fieldClearSignature: "Limpar Assinatura",
    
    // Application post-submit
    submitSuccessTitle: "Candidatura Submetida com Sucesso!",
    submitSuccessNum: "O seu Número de Candidatura:",
    submitSuccessP1: "Obrigado por se candidatar. A sua candidatura foi recebida com sucesso.",
    submitSuccessP2: "A nossa equipa administrativa está a analisar os seus documentos. Uma cópia automática foi registada com segurança e enviada para os e-mails de processamento regional:",
    submitSuccessP3: "Um e-mail de confirmação contendo os detalhes da sua candidatura, resumo da apólice e detalhes bancários foi enviado para o seu e-mail:",
    submitSuccessBtn: "Voltar ao Início",
    submitAdminView: "Ver no Painel Admin",

    // Team
    teamTitle: "A Nossa Equipa de Liderança Dedicada",
    teamSubtitle: "Os profissionais que tornam o apoio transfronteiriço fiável, seguro e digno.",
    teamSupport: "Operações e Apoio ao Membro",
    teamCoordinator: "Coordenador Transfronteiriço",
    teamRelations: "Relações com Clientes e Administração",
    
    // Contact Us
    contactTitle: "Contacte os Nossos Escritórios",
    contactSubtitle: "Entre em contacto connosco hoje. Estamos sempre prontos para o ajudar em Inglês e Português.",
    contactOffice: "Endereço da Sede",
    contactOfficeVal: "13 Oorbietjie Street, Nimrod Park, Glen Marais, Kempton Park, 1619, South Africa",
    contactFormTitle: "Envie-nos uma Mensagem",
    contactFormName: "O Seu Nome Completo",
    contactFormEmail: "O Seu Endereço de E-mail",
    contactFormPhone: "O Seu Número de Telefone",
    contactFormSubject: "Assunto",
    contactFormMsg: "A Sua Mensagem",
    contactFormBtn: "Enviar Mensagem",
    contactFormSuccess: "Obrigado por contactar a Care Beyond Borders. A nossa equipa responderá em breve.",
    contactFormError: "Algo correu mal. Por favor, tente novamente.",

    // FAQ
    faqTitle: "Perguntas Frequentes",
    faqSubtitle: "Encontre respostas imediatas sobre a nossa cobertura, transporte transfronteiriço e candidaturas online.",
    faqQ1: "Posso candidatar-me totalmente online sem ir aos vossos escritórios?",
    faqA1: "Sim, com certeza! A Care Beyond Borders dispõe de um sistema de candidatura 100% digital. Pode preencher os seus dados pessoais, listar familiares, carregar o seu BI/Passaporte, assinar digitalmente no seu dispositivo e submeter tudo instantaneamente sem deslocações.",
    faqQ2: "Para onde e de onde vocês fazem transporte?",
    faqA2: "Especializamo-nos no transporte e cobertura de qualquer localidade da África do Sul (Gauteng, Mpumalanga, etc.) diretamente para todos os distritos e cidades da Província de Inhambane, em Moçambique.",
    faqQ3: "Como funciona o Benefício de Assistência de Recuperação?",
    faqA3: "O nosso Benefício de Assistência de Recuperação oferece um pagamento imediato de 40.000 MT (Meticais) ao beneficiário designado após a aprovação da reclamação. Destina-se a apoiar a logística funerária local e aliviar a pressão financeira sobre a família em Moçambique.",
    faqQ4: "Quais são os métodos de pagamento aceites para as prestações?",
    faqA4: "Pode pagar os prémios de adesão mensais através de EFT, Transferência Bancária, Débito Direto ou Dinheiro direto. Receberá as nossas informações bancárias após o registo bem-sucedido.",
    faqQ5: "Quanto tempo demora o processamento das reclamações?",
    faqA5: "A nossa equipa trabalha 24 horas por dia. As autorizações e logísticas de repatriação transfronteiriça são habitualmente iniciadas poucas horas após recebermos a notificação, assegurando apoio à família sem demoras.",

    // Footer & legal
    footerRights: "Todos os Direitos Reservados. Agente de Seguros Registado e Operador de Transportes.",
    footerLegalLinks: "Política de Privacidade | Termos e Condições",
    privacyTitle: "Política de Privacidade",
    termsTitle: "Termos & Condições",
    closeBtn: "Fechar",
    
    // Legal Texts
    privacyText: "A Care Beyond Borders está empenhada em proteger a sua privacidade. Todos os documentos carregados (cópias de BI, comprovativos de morada e assinaturas digitais) através do nosso portal de adesão são encriptados e de uso estritamente restrito à aprovação de apólices e coordenação administrativa. Nunca venderemos ou partilharemos os seus dados com terceiros.",
    termsText: "Ao registar-se na Care Beyond Borders, declara que todas as informações prestadas são verdadeiras. Os pagamentos das mensalidades devem ser efetuados até ao dia 1 de cada mês. O incumprimento no pagamento por dois meses consecutivos poderá resultar na suspensão da apólice. O transporte e repatriação têm um período de carência de 3 meses para causas naturais, sendo a cobertura de acidentes de ativação imediata. As rotas são limitadas de saídas na África do Sul com destino à Província de Inhambane em Moçambique."
  }
};
