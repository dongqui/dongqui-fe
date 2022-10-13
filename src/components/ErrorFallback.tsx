import styled from "styled-components";

const ErrorFallback = ({ error }: { error: any; resetErrorBoundary: any }) => {
  const handleClickGoHome = () => {
    window.location.href = '/'
  }

  return (
    <Container>
      {error?.response?.data?.error?.message || error?.message || 'Unknow Error'}
      <GoHomeButton onClick={handleClickGoHome}>Go home</GoHomeButton>
    </Container>
  )
}

export default ErrorFallback;

const Container = styled.div`
  height: 100vh;
  text-align: center;
  padding: 30%;
`;

const GoHomeButton = styled.button`
  padding: 8px 12px;
  background: black;
  color: white;
  border-radius: 4px;
  margin-top: 16px;
  cursor: pointer;
`