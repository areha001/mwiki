package com.piggysnow.common.filter;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpServletResponseWrapper;
import javax.servlet.http.HttpSession;
import java.io.IOException;

public class XmlDownloadFilter implements Filter {

    /**
     * Filters requests to disable URL-based session identifiers.
     */
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        // skip non-http requests
        if (!(request instanceof HttpServletRequest && response instanceof HttpServletResponse)) {
            chain.doFilter(request, response);
            return;
        }

        HttpServletRequest httpRequest = (HttpServletRequest) request;
        HttpServletResponse httpResponse = (HttpServletResponse) response;
        String uri = httpRequest.getRequestURI();
        if(uri.endsWith(".xml")){
        	String fileName = uri.substring(uri.lastIndexOf("/") + 1);
	        httpResponse.addHeader("Content-Disposition", "attachment;filename=" + fileName);
        }
        // process next request in chain
        chain.doFilter(request, httpResponse);
    }

    /**
     * Unused.
     */
    public void init(FilterConfig config) throws ServletException {
    }

    /**
     * Unused.
     */
    public void destroy() {
    }
}