import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { FileText, Users, Settings, FileSpreadsheet, PackageCheck, FileWarning, Presentation, Boxes, Users2, Import as FileImport, LogOut } from 'lucide-react';
import './Sidebar.css';

const Sidebar = () => {
  const { t } = useTranslation();
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const menuItems = [
    { icon: FileText, label: 'Invoices', path: '/invoices' },
    { icon: Users, label: 'Customers', path: '/customers' },
    { icon: Settings, label: 'My Business', path: '/business' },
    { icon: FileSpreadsheet, label: 'Invoice Journal', path: '/journal' },
    { icon: PackageCheck, label: 'Price List', path: '/' },
    { icon: FileWarning, label: 'Terms', path: '/terms' }, 
    { icon: FileWarning, label: 'Multiple Invoicing', path: '/multiple' },
    { icon: FileWarning, label: 'Unpaid Invoices', path: '/unpaid' },
    { icon: Presentation, label: 'Offer', path: '/offer' },
    { icon: Boxes, label: 'Inventory Control', path: '/inventory' },
    { icon: Users2, label: 'Member Invoicing', path: '/member' },
    { icon: FileImport, label: 'Import/Export', path: '/importexport' },
    { icon: LogOut, label: 'Log out', path: '/logout' },
    
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2 className="sidebar-title">{t('header.menu')}</h2>
      </div>
      <nav className="sidebar-nav">
        <ul className="sidebar-list">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <li key={index} className="sidebar-item">
                <Link 
                  to={item.path} 
                  className={`sidebar-link ${isActive(item.path) ? 'active' : ''}`}
                >
                  <Icon size={18} className={`sidebar-link-icon ${isActive(item.path) ? 'active' : ''}`} />
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
