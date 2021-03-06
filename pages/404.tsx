import { useRouter } from 'next/router';

const ErrorPage: React.FC = () => {
  const { asPath } = useRouter();
  return (
    <div style={{ fontSize: '2rem', marginTop: '5vh' }}>
      <span style={{ color: '#ED254E' }}>{asPath}</span> <span>is not a thing.</span>
    </div>
  );
};

export default ErrorPage;
