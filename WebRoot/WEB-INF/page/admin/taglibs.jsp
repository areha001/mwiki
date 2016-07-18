<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jstl/fmt_rt" prefix="fmt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@ taglib uri="http://www.extremecomponents.org" prefix="ec"%>
<%@ taglib prefix="myf" uri="http://www.chinaschool.net/myFunction" %>  
<c:if test="${errors == null || errors == ''}">
<c:set var="errors" value="${errmsg.msg}"/>
</c:if>