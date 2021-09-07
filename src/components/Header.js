

const Header = () => {
  return (
    <div className="main-nav">
      <div className="sect-1">
        <nav className="navbar navbar-light">
          <div className="navbar-brand" href="/">
            Status Data Page
          </div>
          <div className="download-xsl" onMouseOver={() => {console.log("hello");document.body.style.cursor = "not-allowed"}} onMouseLeave={() => {document.body.style.cursor = "default"}}>
            <button disabled  className="btn pe-0 select-none">
              Download Data
            </button>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Header;
