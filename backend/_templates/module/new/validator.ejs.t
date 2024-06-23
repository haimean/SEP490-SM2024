---
to: src/modules/<%=moduleName%>/<%=name%>/<%=name%>.validator.ts
unless_exists: true
---
import Joi from 'joi';
<% 
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  const capitalizedModuleName = capitalizeFirstLetter(moduleName);
%>
const <%=name%><%=capitalizedModuleName%>Validator = {
};

export default <%=name%><%=capitalizedModuleName%>Validator;
