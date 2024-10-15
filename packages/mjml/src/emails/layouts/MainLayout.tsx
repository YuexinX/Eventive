import { Mjml, MjmlBody } from '@faire/mjml-react';
import { Footer } from 'src/emails/components/Footer';
import { Header } from 'src/emails/components/Header';

interface MainLayoutProps {
  children: React.ReactNode;
}
export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <Mjml>
      <MjmlBody background-color='#E8FBFD'>
        <Header />
        {children}
        <Footer />
      </MjmlBody>
    </Mjml>
  );
};
