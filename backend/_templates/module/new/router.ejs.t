---
to: src/modules/<%=moduleName%>/<%=name%>/<%=name%>.router.ts
unless_exists: true
---
<% 
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  const capitalizedModuleName = capitalizeFirstLetter(moduleName);
%>

import { Router } from 'express';

const <%=name%><%=capitalizedModuleName%>Router = Router();

export default <%=name%><%=capitalizedModuleName%>Router;
