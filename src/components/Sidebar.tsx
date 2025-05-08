import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { FileText, Users, Settings, FileSpreadsheet, PackageCheck, FileWarning, Presentation, Boxes, Users2, Import as FileImport, LogOut } from 'lucide-react';
import { cn } from '../utils/cn';

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
    { icon: FileWarning, label: 'Multiple Invoicing', path: '/multiple' },
    { icon: FileWarning, label: 'Unpaid Invoices', path: '/unpaid' },
    { icon: Presentation, label: 'Offer', path: '/offer' },
    { icon: Boxes, label: 'Inventory Control', path: '/inventory' },
    { icon: Users2, label: 'Member Invoicing', path: '/member' },
    { icon: FileImport, label: 'Import/Export', path: '/importexport' },
    { icon: LogOut, label: 'Log out', path: '/logout' },
  ];

  return (
    <aside className="w-52 bg-white border-r border-gray-200 h-screen overflow-y-auto hidden md:block">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-700">{t('header.menu')}</h2>
      </div>
      <nav className="p-2">
        <ul className="space-y-1">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <li key={index}>
                <Link 
                  to={item.path} 
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
                    isActive(item.path) 
                      ? "bg-primary-50 text-primary-600 font-medium" 
                      : "text-gray-700 hover:bg-gray-100"
                  )}
                >
                  <Icon size={18} className={isActive(item.path) ? "text-primary-500" : "text-gray-500"} />
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