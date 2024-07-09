import classNames from "classnames";

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
  // run onclick props if the click is on item that is not the side-drawer itself
  const clickHandler = (e: any) => {
    if (e.target.id !== "side-drawer") {
      onClick();
    }
  };

  return (
    <div
      id="side-drawer"
      onClick={clickHandler}
      className={classNames({ active: show })}
    >
      {children}
    </div>
  );
}
