/**
 * dom.js: Convenience fcts for DOM manipulation
 Author
 cf AUTHORS.txt

 License
 Copyright (c) 2010-2012 Massachusetts Institute of Technology.
 MIT License (cf. MIT-LICENSE.txt or http://www.opensource.org/licenses/mit-license.php)

*/

define(["jquery"],function($) {
  if (NB$) {
    $ = NB$;
  };

  var Dom = {};
  Dom.elementItem = function (node, n) { //0-based
    var i = 0;
    var child = node.firstChild;
    while (true) {
      while (child.nodeType != 1) {
        child = child.nextSibling;
      }

      if (i == n) {
        return child;
      }      else {
        i++;
        child = child.nextSibling;
      }
    }
  };

  Dom.firstElement = function (node) {
    var child = node.firstChild;
    while (child.nodeType != 1) {
      child = child.nextSibling;
    }

    return child;
  };

  Dom.previousElement = function (node) {
    var n = node.previousSibling;
    while (n) {
      if (n.nodeType == 1) {
        return n;
      }      else {
        n = n.previousSibling;
      }
    }

    return null;
  };

  Dom.nextElement = function (node) {
    var n = node.nextSibling;
    while (n) {
      if (n.nodeType == 1) {
        return n;
      }      else {
        n = n.nextSibling;
      }
    }

    return null;
  };

  Dom.elementPosition = function (node) {
    /**
     * returns the 0-based element-position of 'node',
     * i.e. the number of DOM **elements** that are before 'node'
     *
     **/
    var i = 0;
    var n = Dom.previousElement(node);
    while (n) {
      i++;
      n = Dom.previousElement(n);
    }

    return i;
  };

  Dom.getAncestorByHasAttribute = function (elt, name) {
    var parent = elt.parentNode;
    while (parent && (!(parent.hasAttribute(name)))) {
      parent = parent.parentNode;
    }

    return parent;
  };

  Dom.getParams = function () {
    var s = document.location.search;
    var params = {};
    if (s != '') {
      s = s.substring(1);
      var a = s.split('&');
      for (var i in a) {
        var pos = a[i].search('=');
        var len = a[i].length;
        if (pos != -1) {
          params[a[i].substring(0, pos)] = a[i].substring(pos + 1, len);
        }
      }
    }

    return params;
  };

  Dom.__sections = {
    do_toc: false,
    toc_id: 'toc',
    do_b2t: false,
  }; //parameters.
  Dom.addSection = function () {
    /*
         * inspired from sections.js in stats2
         * just need to initialize it with
         *     $("div.section").each(Dom.addSection);
         */
    var title = this.getAttribute('label');
    if (Dom.__sections.do_toc) {
      $('#' + Dom.__sections.toc_id).append("<a href='#" + this.id + "'>" + title + '</a>');
    }

    $(this).children().wrapAll("<div class='section-body'></div>");
    var b2t = (Dom.__sections.do_b2t) ? '<a class="navlink"  href="#' + Dom.__sections.toc_id + '">back to top </a>' : '';
    $(this).prepend("<div class='section-header'>" + b2t + title + '</div>');
  };
  return Dom;
});
