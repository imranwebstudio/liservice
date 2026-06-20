import { Link } from 'react-router-dom';

const ArrowDots = () => (
  <svg viewBox="0 0 22 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="1.83" cy="8.75" r="1.25" />
    <circle cx="5.16" cy="8.75" r="1.25" />
    <circle cx="8.50" cy="8.75" r="1.25" />
    <circle cx="11.83" cy="8.75" r="1.25" />
    <circle cx="15.17" cy="8.75" r="1.25" />
    <circle cx="20.17" cy="8.75" r="1.25" />
    <circle cx="17.67" cy="6.25" r="1.25" />
    <circle cx="15.17" cy="3.75" r="1.25" />
    <circle cx="17.67" cy="11.25" r="1.25" />
    <circle cx="15.17" cy="13.75" r="1.25" />
    <circle cx="12.67" cy="16.25" r="1.25" />
    <circle cx="12.67" cy="1.25" r="1.25" />
  </svg>
);

const Inner = ({ label }: { label: string }) => (
  <>
    <span>{label}</span>
    <span className="arrow-circle">
      <ArrowDots />
    </span>
  </>
);

interface Props {
  label: string;
  to?: string;
  href?: string;
  onClick?: () => void;
  target?: string;
  rel?: string;
}

const SubscribeButton = ({ label, to, href, onClick, target, rel }: Props) => {
  if (to) {
    return (
      <Link to={to} className="btn-subscribe">
        <Inner label={label} />
      </Link>
    );
  }
  if (href) {
    return (
      <a href={href} className="btn-subscribe" target={target} rel={rel}>
        <Inner label={label} />
      </a>
    );
  }
  return (
    <button type="button" className="btn-subscribe" onClick={onClick}>
      <Inner label={label} />
    </button>
  );
};

export default SubscribeButton;
