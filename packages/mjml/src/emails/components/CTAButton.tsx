import { MjmlButton } from '@faire/mjml-react';

interface CTAButtonProps {
  link: string;
  label: string;
}
export const CTAButton: React.FC<CTAButtonProps> = ({ link, label }) => {
  return (
    <MjmlButton
      width='100%'
      background-color='#264d4f'
      font-size='18px'
      href={link}>
      {label}
    </MjmlButton>
  );
};
