import GoBackButton from '@components/goBackButton/GoBackButton';

export default function NotFound() {
  return (
    <div style={{
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'center', 
      alignItems: 'center',
      height: '80vh'
    }}
    >
      <h1>
        404 Not found
      </h1>
      <GoBackButton />
    </div>
  );
}
