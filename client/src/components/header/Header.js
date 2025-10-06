import './Header.css'; 

const Header = (props) => {
  return (
    <header className="header">
        ¡{props.username}, te otorgamos 3 y 6 cuotas sin interés!
    </header>
  );
};

export default Header;