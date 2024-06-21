const SidebarCloser = () => {
  const closeSidebar = () => {
    const sidebar = document.querySelector(".sidebar");
    sidebar.classList.remove("open");
  };

  return (
    <div className="sidebar-toggler">
      <i onClick={closeSidebar} className="fa fa-times" aria-hidden="true"></i>
    </div>
  );
};

export default SidebarCloser;
