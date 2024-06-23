---
to: src/modules/<%=moduleName%>/<%=name%>/<%=name%>.controller.ts
unless_exists: true
---

<% 
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  const capitalizedModuleName = capitalizeFirstLetter(moduleName);
%>


const <%=name%><%=capitalizedModuleName%>Controller = {
};

export default <%=name%><%=capitalizedModuleName%>Controller;
