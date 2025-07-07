import "./header.css"
import { useSidebar } from "../context/sidebarContext";

const Header = () => {
  const {collapsed} = useSidebar();
  return(
    <>
    <div className={`header ${collapsed ? 'collapsed' : ''}`}>
      <p>This is a header</p>
    </div>
    </>
  )
}

export default Header;