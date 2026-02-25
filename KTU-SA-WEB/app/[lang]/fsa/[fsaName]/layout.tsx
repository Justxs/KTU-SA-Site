type Props = {
  children: React.ReactNode;
};

export default async function RootLayout(props: Readonly<Props>) {
  const { children } = props;

  return <div>{children}</div>;
}
