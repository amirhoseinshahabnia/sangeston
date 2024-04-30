import classNames from 'classnames';

type SideDrawerProps = {
  show: boolean;
  onClick: () => void;
  children: React.ReactNode;
};

export default function SideDrawer({
  show,
  onClick,
  children,
}: SideDrawerProps) {
  const clickHandler = (e: any) => {
    if (e.target.localName === 'div') {
      onClick();
    }
  };

  return (
    <div
      id="side-drawer"
      onClick={(e) => clickHandler(e)}
      className={classNames({ active: show })}
    >
      {children}
    </div>
  );
}
