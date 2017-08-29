import { Injectable } from '@angular/core';
import { Http,Response} from '@angular/http';
import * as $ from 'jquery';
import {AngularFireDatabase,FirebaseListObservable} from 'angularfire2/database';
import firebase from "firebase";
@Injectable()
export class SettingProvider {
  url:string;
  _dbprov: FirebaseListObservable<any>;
  _dbkab: FirebaseListObservable<any>;
  _dbkec: FirebaseListObservable<any>;
  _dbkel: FirebaseListObservable<any>;
  allProvinsi;
  //el:JQuery;
  AdminLTE:any;AdminLTEOptions:any;
  firedataprov = firebase.database().ref("/provinsi");
  firedatakab = firebase.database().ref("/kabupaten");
  firedatakec = firebase.database().ref("/kecamatan");
  firedatakel = firebase.database().ref("/kelurahan");
  constructor(public _http:Http,public db: AngularFireDatabase) {
    console.log('Hello SettingProvider Provider');
    this._dbprov = db.list('/provinsi');
    //this._dbkab = db.list('/kabupaten');
    this._dbkec = db.list('/kecamatan');
    this._dbkel = db.list('/kelurahan');
    this.setUrl('http://localhost');
    this.AdminLTE = {};
    this.AdminLTE.options = {
      //Add slimscroll to navbar menus
      //This requires you to load the slimscroll plugin
      //in every page before app.js
      navbarMenuSlimscroll: true,
      navbarMenuSlimscrollWidth: "3px", //The width of the scroll bar
      navbarMenuHeight: "200px", //The height of the inner menu
      //General animation speed for JS animated elements such as box collapse/expand and
      //sidebar treeview slide up/down. This options accepts an integer as milliseconds,
      //'fast', 'normal', or 'slow'
      animationSpeed: 500,
      //Sidebar push menu toggle button selector
      sidebarToggleSelector: "[data-toggle='offcanvas']",
      //Activate sidebar push menu
      sidebarPushMenu: true,
      //Activate sidebar slimscroll if the fixed layout is set (requires SlimScroll Plugin)
      sidebarSlimScroll: true,
      //Enable sidebar expand on hover effect for sidebar mini
      //This option is forced to true if both the fixed layout and sidebar mini
      //are used together
      sidebarExpandOnHover: false,
      //BoxRefresh Plugin
      enableBoxRefresh: true,
      //Bootstrap.js tooltip
      enableBSToppltip: true,
      BSTooltipSelector: "[data-toggle='tooltip']",
      //Enable Fast Click. Fastclick.js creates a more
      //native touch experience with touch devices. If you
      //choose to enable the plugin, make sure you load the script
      //before AdminLTE's app.js
      enableFastclick: false,
      //Control Sidebar Tree views
      enableControlTreeView: true,
      //Control Sidebar Options
      enableControlSidebar: true,
      controlSidebarOptions: {
        //Which button should trigger the open/close event
        toggleBtnSelector: "[data-toggle='control-sidebar']",
        //The sidebar selector
        selector: ".control-sidebar",
        //Enable slide over content
        slide: true
      },
      //Box Widget Plugin. Enable this plugin
      //to allow boxes to be collapsed and/or removed
      enableBoxWidget: true,
      //Box Widget plugin options
      boxWidgetOptions: {
        boxWidgetIcons: {
          //Collapse icon
          collapse: 'fa-minus',
          //Open icon
          open: 'fa-plus',
          //Remove icon
          remove: 'fa-times'
        },
        boxWidgetSelectors: {
          //Remove button selector
          remove: '[data-widget="remove"]',
          //Collapse button selector
          collapse: '[data-widget="collapse"]'
        }
      },
      //Direct Chat plugin options
      directChat: {
        //Enable direct chat by default
        enable: true,
        //The button to open and close the chat contacts pane
        contactToggleSelector: '[data-widget="chat-pane-toggle"]'
      },
      //Define the set of colors to use globally around the website
      colors: {
        lightBlue: "#3c8dbc",
        red: "#f56954",
        green: "#00a65a",
        aqua: "#00c0ef",
        yellow: "#f39c12",
        blue: "#0073b7",
        navy: "#001F3F",
        teal: "#39CCCC",
        olive: "#3D9970",
        lime: "#01FF70",
        orange: "#FF851B",
        fuchsia: "#F012BE",
        purple: "#8E24AA",
        maroon: "#D81B60",
        black: "#222222",
        gray: "#d2d6de"
      },
      //The standard screen sizes that bootstrap uses.
      //If you change these in the variables.less file, change
      //them here too.
      screenSizes: {
        xs: 480,
        sm: 768,
        md: 992,
        lg: 1200
      }
    };

    if (typeof this.AdminLTEOptions !== "undefined") {
      $.extend(true,
        this.AdminLTE.options,
        this.AdminLTEOptions);
    }
  }

  setUrl(url) {
    this.url = url;
  }
  getUrl() {
    return this.url;   
  }

  getAllProvinsi(){
      return this._http.get(this.url+"/api/getprovinsi")
      .map((response:Response)=>response.json());
  }

  getAllKabupaten(provinsi){
      return this._http.get(this.url+"/api/getkabupaten/"+provinsi)
      .map((response:Response)=>response.json());
  }
  
  getAllKecamatan(kabupaten){
      return this._http.get(this.url+"/api/getkecamatan/"+kabupaten)
      .map((response:Response)=>response.json());
  }

  getAllDesa(kecamatan){
      return this._http.get(this.url+"/api/getdesa/"+kecamatan)
      .map((response:Response)=>response.json());
  }
  
  loadwilayah(){
    this.getAllProvinsi().subscribe((data)=>{
      this._dbprov.push(data);
      },function (error){
        console.log("error"+error);
      },function(){
        console.log("Mengambil data kecamatan");
      }
    );

    this._http.get(this.url+"/api/getkabupaten/all")
      .map((response:Response)=>response.json()).subscribe((data)=>{
        this._dbkab.push(data);
      });
    
    this._http.get(this.url+"/api/getkecamatan/all")
      .map((response:Response)=>response.json()).subscribe((data)=>{
        this._dbkec.push(data);
      });

    this._http.get(this.url+"/api/getkelurahan/all")
      .map((response:Response)=>response.json()).subscribe((data)=>{
        this._dbkel.push(data);
      });
    
    
  }

  _init() {
    'use strict';
    
    /*this.AdminLTE.layout = {
      activate: function () {
        var _this = this;
        _this.fix();
        _this.fixSidebar();
        $('body, html, .wrapper').css('height', 'auto');
        $(window, ".wrapper").resize(function () {
          _this.fix();
          _this.fixSidebar();
        });
      },
      fix: function () {
        // Remove overflow from .wrapper if layout-boxed exists
        $(".layout-boxed > .wrapper").css('overflow', 'hidden');
        //Get window height and the wrapper height
        var footer_height = $('.main-footer').outerHeight() || 0;
        var neg = $('.main-header').outerHeight() + footer_height;
        var window_height = $(window).height();
        var sidebar_height = $(".sidebar").height() || 0;
        //Set the min-height of the content and sidebar based on the
        //the height of the document.
        if ($("body").hasClass("fixed")) {
          $(".content-wrapper, .right-side").css('min-height', window_height - footer_height);
        } else {
          var postSetWidth;
          if (window_height >= sidebar_height) {
            $(".content-wrapper, .right-side").css('min-height', window_height - neg);
            postSetWidth = window_height - neg;
          } else {
            $(".content-wrapper, .right-side").css('min-height', sidebar_height);
            postSetWidth = sidebar_height;
          }

          //Fix for the control sidebar height
          var controlSidebar = $(this.AdminLTE.options.controlSidebarOptions.selector);
          if (typeof controlSidebar !== "undefined") {
            if (controlSidebar.height() > postSetWidth)
              $(".content-wrapper, .right-side").css('min-height', controlSidebar.height());
          }

        }
      },
      fixSidebar: function () {
        //Make sure the body tag has the .fixed class
        if (!$("body").hasClass("fixed")) {
          if (typeof $.fn.slimScroll != 'undefined') {
            $(".sidebar").slimScroll({destroy: true}).height("auto");
          }
          return;
        } else if (typeof $.fn.slimScroll == 'undefined' && window.console) {
          window.console.error("Error: the fixed layout requires the slimscroll plugin!");
        }
        //Enable slimscroll for fixed layout
        if (this.AdminLTE.options.sidebarSlimScroll) {
          if (typeof $.fn.slimScroll != 'undefined') {
            //Destroy if it exists
            $(".sidebar").slimScroll({destroy: true}).height("auto");
            //Add slimscroll
            $(".sidebar").slimScroll({
              height: ($(window).height() - $(".main-header").height()) + "px",
              color: "rgba(0,0,0,0.2)",
              size: "3px"
            });
          }
        }
      }
    };*/

   
    /*this.AdminLTE.pushMenu = {
      activate: function (toggleBtn) {
        //Get the screen sizes
        var screenSizes = this.AdminLTE.options.screenSizes;

        //Enable sidebar toggle
        $(document).on('click', toggleBtn, function (e) {
          e.preventDefault();

          //Enable sidebar push menu
          if ($(window).width() > (screenSizes.sm - 1)) {
            if ($("body").hasClass('sidebar-collapse')) {
              $("body").removeClass('sidebar-collapse').trigger('expanded.pushMenu');
            } else {
              $("body").addClass('sidebar-collapse').trigger('collapsed.pushMenu');
            }
          }
          //Handle sidebar push menu for small screens
          else {
            if ($("body").hasClass('sidebar-open')) {
              $("body").removeClass('sidebar-open').removeClass('sidebar-collapse').trigger('collapsed.pushMenu');
            } else {
              $("body").addClass('sidebar-open').trigger('expanded.pushMenu');
            }
          }
        });

        $(".content-wrapper").click(function () {
          //Enable hide menu when clicking on the content-wrapper on small screens
          if ($(window).width() <= (screenSizes.sm - 1) && $("body").hasClass("sidebar-open")) {
            $("body").removeClass('sidebar-open');
          }
        });

        //Enable expand on hover for sidebar mini
        if (this.AdminLTE.options.sidebarExpandOnHover
          || ($('body').hasClass('fixed')
          && $('body').hasClass('sidebar-mini'))) {
          this.expandOnHover();
        }
      },
      expandOnHover: function () {
        var _this = this;
        var screenWidth = this.AdminLTE.options.screenSizes.sm - 1;
        //Expand sidebar on hover
        $('.main-sidebar').hover(function () {
          if ($('body').hasClass('sidebar-mini')
            && $("body").hasClass('sidebar-collapse')
            && $(window).width() > screenWidth) {
            _this.expand();
          }
        }, function () {
          if ($('body').hasClass('sidebar-mini')
            && $('body').hasClass('sidebar-expanded-on-hover')
            && $(window).width() > screenWidth) {
            _this.collapse();
          }
        });
      },
      expand: function () {
        $("body").removeClass('sidebar-collapse').addClass('sidebar-expanded-on-hover');
      },
      collapse: function () {
        if ($('body').hasClass('sidebar-expanded-on-hover')) {
          $('body').removeClass('sidebar-expanded-on-hover').addClass('sidebar-collapse');
        }
      }
    };*/

    
    /*this.AdminLTE.tree = function (menu) {
      var _this = this;
      var animationSpeed = this.AdminLTE.options.animationSpeed;
      $(document).off('click', menu + ' li a')
        .on('click', menu + ' li a', function (e) {
          //Get the clicked link and the next element
          var $this = $(this);
          var checkElement = $this.next();

          //Check if the next element is a menu and is visible
          if ((checkElement.is('.treeview-menu')) && (checkElement.is(':visible')) && (!$('body').hasClass('sidebar-collapse'))) {
            //Close the menu
            checkElement.slideUp(animationSpeed, function () {
              checkElement.removeClass('menu-open');
              //Fix the layout in case the sidebar stretches over the height of the window
              //_this.layout.fix();
            });
            checkElement.parent("li").removeClass("active");
          }
          //If the menu is not visible
          else if ((checkElement.is('.treeview-menu')) && (!checkElement.is(':visible'))) {
            //Get the parent menu
            var parent = $this.parents('ul').first();
            //Close all open menus within the parent
            var ul = parent.find('ul:visible').slideUp(animationSpeed);
            //Remove the menu-open class from the parent
            ul.removeClass('menu-open');
            //Get the parent li
            var parent_li = $this.parent("li");

            //Open the target menu and add the menu-open class
            checkElement.slideDown(animationSpeed, function () {
              //Add the class active to the parent li
              checkElement.addClass('menu-open');
              parent.find('li.active').removeClass('active');
              parent_li.addClass('active');
              //Fix the layout in case the sidebar stretches over the height of the window
              _this.layout.fix();
            });
          }
          //if this isn't a link, prevent the page from being redirected
          if (checkElement.is('.treeview-menu')) {
            e.preventDefault();
          }
        });
    };*/

    
    /*this.AdminLTE.controlSidebar = {
      //instantiate the object
      activate: function () {
        //Get the object
        var _this = this;
        //Update options
        var o = this.AdminLTE.options.controlSidebarOptions;
        //Get the sidebar
        var sidebar = $(o.selector);
        //The toggle button
        var btn = $(o.toggleBtnSelector);

        //Listen to the click event
        btn.on('click', function (e) {
          e.preventDefault();
          //If the sidebar is not open
          if (!sidebar.hasClass('control-sidebar-open')
            && !$('body').hasClass('control-sidebar-open')) {
            //Open the sidebar
            _this.open(sidebar, o.slide);
          } else {
            _this.close(sidebar, o.slide);
          }
        });

        //If the body has a boxed layout, fix the sidebar bg position
        var bg = $(".control-sidebar-bg");
        _this._fix(bg);

        //If the body has a fixed layout, make the control sidebar fixed
        if ($('body').hasClass('fixed')) {
          _this._fixForFixed(sidebar);
        } else {
          //If the content height is less than the sidebar's height, force max height
          if ($('.content-wrapper, .right-side').height() < sidebar.height()) {
            _this._fixForContent(sidebar);
          }
        }
      },
      //Open the control sidebar
      open: function (sidebar, slide) {
        //Slide over content
        if (slide) {
          sidebar.addClass('control-sidebar-open');
        } else {
          //Push the content by adding the open class to the body instead
          //of the sidebar itself
          $('body').addClass('control-sidebar-open');
        }
      },
      //Close the control sidebar
      close: function (sidebar, slide) {
        if (slide) {
          sidebar.removeClass('control-sidebar-open');
        } else {
          $('body').removeClass('control-sidebar-open');
        }
      },
      _fix: function (sidebar) {
        var _this = this;
        if ($("body").hasClass('layout-boxed')) {
          sidebar.css('position', 'absolute');
          sidebar.height($(".wrapper").height());
          if (_this.hasBindedResize) {
            return;
          }
          $(window).resize(function () {
            _this._fix(sidebar);
          });
          _this.hasBindedResize = true;
        } else {
          sidebar.css({
            'position': 'fixed',
            'height': 'auto'
          });
        }
      },
      _fixForFixed: function (sidebar) {
        sidebar.css({
          'position': 'fixed',
          'max-height': '100%',
          'overflow': 'auto',
          'padding-bottom': '50px'
        });
      },
      _fixForContent: function (sidebar) {
        $(".content-wrapper, .right-side").css('min-height', sidebar.height());
      }
    };*/

    
    this.AdminLTE.boxWidget = {
      selectors: this.AdminLTE.options.boxWidgetOptions.boxWidgetSelectors,
      icons: this.AdminLTE.options.boxWidgetOptions.boxWidgetIcons,
      animationSpeed: this.AdminLTE.options.animationSpeed,
      activate: function (_box) {
        var _this = this;
        if (!_box) {
          _box = document; // activate all boxes per default
        }
        //Listen for collapse event triggers
        $(_box).on('click', _this.selectors.collapse, function (e) {
          e.preventDefault();
          _this.collapse($(this));
        });

        //Listen for remove event triggers
        $(_box).on('click', _this.selectors.remove, function (e) {
          e.preventDefault();
          _this.remove($(this));
        });
      },
      collapse: function (element) {
        var _this = this;
        //Find the box parent
        var box = element.parents(".box").first();
        //Find the body and the footer
        var box_content = box.find("> .box-body, > .box-footer, > form  >.box-body, > form > .box-footer");
        if (!box.hasClass("collapsed-box")) {
          //Convert minus into plus
          element.children(":first")
            .removeClass(_this.icons.collapse)
            .addClass(_this.icons.open);
          //Hide the content
          box_content.slideUp(_this.animationSpeed, function () {
            box.addClass("collapsed-box");
          });
        } else {
          //Convert plus into minus
          element.children(":first")
            .removeClass(_this.icons.open)
            .addClass(_this.icons.collapse);
          //Show the content
          box_content.slideDown(_this.animationSpeed, function () {
            box.removeClass("collapsed-box");
          });
        }
      },
      remove: function (element) {
        //Find the box parent
        var box = element.parents(".box").first();
        box.slideUp(this.animationSpeed);
      }
    };
  }

  getallprovinsi() {
    var promise = new Promise((resolve, reject) => {
      this.firedataprov.once('value', (snapshot) => {
        let tanah = snapshot.val();
        let temparr = [];
        for (var key in tanah) {
          temparr.push(tanah[key]);
        }
        resolve(temparr);
      }).catch((err) => {
        reject(err);
      })
    })
    return promise;
  }

  getallkabupaten(provinsi) {
    var promise = new Promise((resolve, reject) => {
      this.firedatakab.orderByChild('kode_prov').equalTo(provinsi).once('value', (snapshot) => {
        let tanah = snapshot.val();
        let temparr = [];
        for (var key in tanah) {
          temparr.push(tanah[key]);
        }
        resolve(temparr);
      }).catch((err) => {
        reject(err);
      })
    })
    return promise;
  }

  

}
