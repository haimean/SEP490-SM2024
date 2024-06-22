---
to: src/modules/<%=moduleName%>/<%=name%>/<%=name%>.service.ts
unless_exists: true
---
<% 
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  const capitalizedModuleName = capitalizeFirstLetter(moduleName);
%>
const <%=name%><%=capitalizedModuleName%>Service = {
};

export default <%=name%><%=capitalizedModuleName%>Service;
