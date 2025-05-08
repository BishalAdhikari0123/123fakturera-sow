import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Header from '../components/Header';
import { getTerms } from '../utils/api';

const TermsPage = () => {
  const { i18n } = useTranslation();
  const [termsContent, setTermsContent] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTerms = async () => {
      try {
        setLoading(true);
        const data = await getTerms(i18n.language);
        setTermsContent(data.content);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching terms:', err);
        setError('Failed to load terms content');
        setLoading(false);
        
        // Fallback content if API fails
        if (i18n.language === 'en') {
          setTermsContent(`
            <h1>Terms and Conditions</h1>
            <p>Welcome to 123Fakturera, the invoicing service that makes it easy for you to create and manage your invoices.</p>
            
            <h2>1. Introduction</h2>
            <p>These Terms and Conditions govern your use of our web application and services offered by 123Fakturera.</p>
            
            <h2>2. Definitions</h2>
            <p>In these Terms and Conditions, the following definitions apply:</p>
            <ul>
              <li>"Service" refers to the 123Fakturera web application</li>
              <li>"User" refers to the individual or entity using our Service</li>
              <li>"Account" refers to the unique credentials that allow access to the Service</li>
            </ul>
            
            <h2>3. Account Terms</h2>
            <p>When you create an account with us, you guarantee that the information you provide is accurate, complete, and current at all times. Inaccurate, incomplete, or obsolete information may result in the immediate termination of your account on the Service.</p>
            
            <h2>4. Service Usage</h2>
            <p>Our service allows you to create invoices, manage customers, and track payments. You are responsible for maintaining the confidentiality of your account and password and for restricting access to your computer. You agree to accept responsibility for all activities that occur under your account.</p>
            
            <h2>5. Intellectual Property</h2>
            <p>The Service and its original content, features, and functionality are owned by 123Fakturera and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.</p>
            
            <h2>6. Termination</h2>
            <p>We may terminate or suspend your account and bar access to the Service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of the Terms.</p>
            
            <h2>7. Limitation of Liability</h2>
            <p>In no event shall 123Fakturera, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.</p>
            
            <h2>8. Changes</h2>
            <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. It is your responsibility to review these Terms periodically for changes.</p>
            
            <h2>9. Contact Us</h2>
            <p>If you have any questions about these Terms, please contact us at support@123fakturera.se.</p>
          `);
        } else {
          setTermsContent(`
            <h1>Allmänna villkor</h1>
            <p>Välkommen till 123Fakturera, faktureringstjänsten som gör det enkelt för dig att skapa och hantera dina fakturor.</p>
            
            <h2>1. Introduktion</h2>
            <p>Dessa allmänna villkor reglerar din användning av vår webbapplikation och tjänster som erbjuds av 123Fakturera.</p>
            
            <h2>2. Definitioner</h2>
            <p>I dessa allmänna villkor gäller följande definitioner:</p>
            <ul>
              <li>"Tjänsten" avser 123Fakturera webbapplikation</li>
              <li>"Användare" avser den individ eller entitet som använder vår tjänst</li>
              <li>"Konto" avser de unika autentiseringsuppgifter som ger tillgång till tjänsten</li>
            </ul>
            
            <h2>3. Kontovillkor</h2>
            <p>När du skapar ett konto hos oss garanterar du att informationen du tillhandahåller är korrekt, fullständig och aktuell. Felaktig, ofullständig eller föråldrad information kan leda till omedelbar uppsägning av ditt konto.</p>
            
            <h2>4. Användning av tjänsten</h2>
            <p>Vår tjänst låter dig skapa fakturor, hantera kunder och spåra betalningar. Du ansvarar för att upprätthålla sekretessen för ditt konto och lösenord och för att begränsa åtkomsten till din dator. Du samtycker till att acceptera ansvar för alla aktiviteter som sker under ditt konto.</p>
            
            <h2>5. Immateriella rättigheter</h2>
            <p>Tjänsten och dess ursprungliga innehåll, funktioner och funktionalitet ägs av 123Fakturera och skyddas av internationella upphovsrätts-, varumärkes-, patent-, företagshemlighets- och andra immateriella rättighetslagar.</p>
            
            <h2>6. Uppsägning</h2>
            <p>Vi kan säga upp eller stänga av ditt konto och hindra åtkomst till tjänsten omedelbart, utan föregående meddelande eller ansvar, enligt vårt eget gottfinnande, av vilken anledning som helst och utan begränsning, inklusive men inte begränsat till ett brott mot villkoren.</p>
            
            <h2>7. Ansvarsbegränsning</h2>
            <p>Under inga omständigheter ska 123Fakturera, eller dess direktörer, anställda, partners, agenter, leverantörer eller dotterbolag, vara ansvariga för några indirekta, tillfälliga, särskilda, följdskador eller straffskador, inklusive utan begränsning, förlust av vinst, data, användning, goodwill eller andra immateriella förluster, som följer av din åtkomst till eller användning av eller oförmåga att komma åt eller använda tjänsten.</p>
            
            <h2>8. Ändringar</h2>
            <p>Vi förbehåller oss rätten att efter eget gottfinnande när som helst ändra eller ersätta dessa villkor. Det är ditt ansvar att regelbundet granska dessa villkor för ändringar.</p>
            
            <h2>9. Kontakta oss</h2>
            <p>Om du har några frågor om dessa villkor, vänligen kontakta oss på support@123fakturera.se.</p>
          `);
        }
      }
    };

    fetchTerms();
  }, [i18n.language]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <main className="flex-1">
        <div className="bg-terms-bg bg-cover bg-center h-40 md:h-60 relative">
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <div className="text-center">
              <img 
                src="https://storage.123fakturera.se/public/icons/diamond.png" 
                alt="123Fakturera"
                className="w-14 h-14 mx-auto mb-3"
              />
              <h1 className="text-white text-3xl md:text-4xl font-bold">123Fakturera</h1>
            </div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary-500"></div>
              </div>
            ) : error ? (
              <div className="text-red-500 text-center py-8">
                <p>{error}</p>
              </div>
            ) : (
              <div 
                className="terms-content prose max-w-none"
                dangerouslySetInnerHTML={{ __html: termsContent }}
              />
            )}
          </div>
        </div>
      </main>
      
      <footer className="bg-gray-100 border-t border-gray-200 py-6">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>&copy; {new Date().getFullYear()} 123Fakturera. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default TermsPage;