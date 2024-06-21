const SidebarOpener = () => {
  const openSidebar = () => {
    const sidebar = document.querySelector(".sidebar"); // Get the sidebar element
    sidebar.classList.add("open"); // Add the "open" class to the sidebar
  };

  return (
    <div className="sidebar-toggler">
      <i onClick={openSidebar} className="fa fa-bars" aria-hidden="true"></i>
    </div>
  );
};
export default SidebarOpener;
