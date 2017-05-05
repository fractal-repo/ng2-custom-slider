import { Component, ElementRef, HostListener, Input, NgModule, ViewChild, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

var CarouselComponent = (function () {
    /**
     * @param {?} ele
     */
    function CarouselComponent(ele) {
        this.ele = ele;
        this.currentSlide = 0;
        this.sliderType = 'flat';
        this.prevBtnArow = true;
        this.nextBtnArow = false;
        this.options = {
            slides_per_view: 3,
            animation_type: 'flat',
            slide_navigation: true,
            slide_pagination: true,
            padding: 40
        };
    }
    /**
     * @param {?} event
     * @return {?}
     */
    CarouselComponent.prototype.onResize = function (event) {
        this.carousel(this.compoArr, this.configOpt);
    };
    /**
     * @return {?}
     */
    CarouselComponent.prototype.ngAfterViewInit = function () {
        this.carousel(this.compoArr, this.configOpt);
    };
    /**
     * @return {?}
     */
    CarouselComponent.prototype.ngOnInit = function () {
        this.slide_data = this.compoArr;
    };
    /**
     * Carousel
     * @param {?} slides
     * @param {?=} inputOpt
     * @return {?}
     */
    CarouselComponent.prototype.carousel = function (slides, inputOpt) {
        var /** @type {?} */ parentObj = this;
        console.log("current slide: " + this.currentSlide);
        this.options = Object.assign(this.options, inputOpt);
        //console.log(this.options);
        this.no_of_slides = slides.length;
        var /** @type {?} */ contentwidth = this.slider.nativeElement.clientWidth - (this.options.padding * 2);
        //console.log(contentwidth)
        this.content.nativeElement.style.width = contentwidth + 'px';
        this.slide_width = contentwidth / this.options.slides_per_view;
        console.log(this.slides);
        for (var /** @type {?} */ i = 0; i < this.no_of_slides; i++) {
            this.slides.nativeElement.children[i].style.width = this.slide_width + "px";
        }
        // this.slider.nativeElement.style.paddingLeft = this.options.padding+"px";
        // this.slider.nativeElement.style.paddingRight = this.options.padding+"px";
        this.slides.nativeElement.style.width = (this.slide_width * this.no_of_slides) + 'px';
        // setTimeout(function(){
        //   parentObj.
        // },200)
        //set initial position
        if (this.currentSlide == 0)
            this.gotoSlideNo(0);
        else
            this.gotoSlideNo(this.currentSlide);
        //this.sliderType = this.options.animation_type;
        console.log(this.sliderType);
        if (this.currentSlide == 0) {
            switch (this.options.animation_type) {
                case 'flat':
                    //set initial position
                    this.initPos(this.slides, this.currentSlide);
                    break;
                case 'circular':
                    //set initial position
                    setTimeout(function () {
                        parentObj.sliderType = 'circular';
                    }, 1);
                    var /** @type {?} */ gapCalc = (this.options.slides_per_view % 2 == 0) ? ((this.options.slides_per_view / 2) - .5) : (this.options.slides_per_view % 2);
                    console.log("gap : " + gapCalc);
                    var /** @type {?} */ initialPos = this.slide_width * gapCalc;
                    console.log(this.sliderType);
                    this.initPos(this.slides, initialPos);
                    break;
            }
        }
    };
    /**
     * @param {?} slideDirection
     * @param {?=} sliderEle
     * @return {?}
     */
    CarouselComponent.prototype.navigateSlides = function (slideDirection, sliderEle) {
        console.log(slideDirection);
        console.log(this.currentSlide);
        switch (slideDirection) {
            case 'next':
                //set initial position
                var /** @type {?} */ tempSlideNoNext = (this.currentSlide < (this.no_of_slides - 1)) ? (this.currentSlide + 1) : this.currentSlide;
                console.log(tempSlideNoNext);
                this.gotoSlideNo(tempSlideNoNext);
                break;
            case 'prev':
                //set initial position
                var /** @type {?} */ tempSlideNoPrev = (this.currentSlide > 0) ? (this.currentSlide - 1) : this.currentSlide;
                this.gotoSlideNo(tempSlideNoPrev);
                break;
        }
    };
    /**
     * @param {?} slideNo
     * @return {?}
     */
    CarouselComponent.prototype.gotoSlideNo = function (slideNo) {
        // sliderEle = sliderEle.elementRef;
        var /** @type {?} */ pos = -(this.slide_width * slideNo);
        this.currentSlide = slideNo;
        this.prevBtnArow = (this.currentSlide > 0) ? false : true;
        this.nextBtnArow = (this.currentSlide < (this.no_of_slides - 1)) ? false : true;
        switch (this.options.animation_type) {
            case 'flat':
                //set initial position
                this.slides.nativeElement.style.transform = "translateX(" + pos + "px)";
                break;
            case 'circular':
                //set initial position
                var /** @type {?} */ gapCalc = (this.options.slides_per_view % 2 == 0) ? ((this.options.slides_per_view / 2) - .5) : (this.options.slides_per_view % 2);
                console.log("gap : " + gapCalc);
                var /** @type {?} */ initialPos = this.slide_width * gapCalc;
                pos = pos + initialPos;
                this.slides.nativeElement.style.transform = "translateX(" + pos + "px)";
                break;
        }
    };
    /**
     * @param {?=} carouselEle
     * @param {?=} pos
     * @return {?}
     */
    CarouselComponent.prototype.initPos = function (carouselEle, pos) {
        carouselEle.nativeElement.style.transform = "translateX(" + pos + "px)";
    };
    return CarouselComponent;
}());
CarouselComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-carousel',
                template: "<div [ngClass]=\"{'cstm-slider':true,'slider-3d':sliderType=='circular'}\" #slider> <!--width--> <div class=\"slider-content\" #content> <ul class=\"slides\" #slides> <li *ngFor=\"let item of slide_data; let i = index\" [innerHTML]=\"item\" [ngClass]=\"{'slide-item':true,'slide-active':(currentSlide==i)}\">{{item}}</li> </ul> </div> <ng-container> <a [ngClass]=\"{'slider-nav':true,'next-nav':true,'nav-disable':nextBtnArow}\" (click)=\"navigateSlides('next',slides)\"><i class=\"glyphicon glyphicon-chevron-right\"></i></a> <a [ngClass]=\"{'slider-nav':true,'prev-nav':true,'nav-disable':prevBtnArow}\" (click)=\"navigateSlides('prev',slides)\"><i class=\"glyphicon glyphicon-chevron-left\"></i></a> </ng-container> <div class=\"slider-pagination\"> <ul class=\"pagi-wrap\"> <li class=\"pagi-item\" *ngFor=\"let item of slide_data; let i = index\"><a [ngClass]=\"{'pagi-item-nav':true,'pagi-active':(currentSlide==i)}\" (click)=\"gotoSlideNo(i)\">{{i+1}}</a></li> </ul> </div> </div>",
                styles: [".cstm-slider { position: relative; padding: 0 40px; .slider-content { overflow: hidden; .slides { list-style: none; margin: 0; padding: 0; float: left; transition-duration: 1s; .slide-item { display: inline-block; padding: 10px; box-sizing: border-box; opacity: .5; img { width: 100%; border: solid 5px #fff; box-shadow: 0px 0px 4px 1px rgba(0, 0, 0, 0.5); } &.slide-active { opacity: 1; } } } } .slider-nav { position: absolute; top: 50%; transform: translateY(-50%); overflow: hidden; width: 35px; height: 35px; font-size: 30px; z-index: 2; left: 5px; cursor: pointer; &.next-nav { left: auto; right: 5px; } &.nav-disable { opacity: .5; cursor: default; } } .slider-pagination { text-align: center; position: absolute; left: 0; right: 0; bottom: -20px; .pagi-wrap { padding: 0; margin: 0; .pagi-item { display: inline-block; margin: 0 10px; .pagi-item-nav { display: block; text-indent: -200px; width: 10px; height: 10px; overflow: hidden; background: #666; border-radius: 50%; cursor: pointer; &:hover { background: #337ab7; } &.pagi-active { background: #337ab7; } } } } } &.slider-3d { .slider-content { padding: 3% 0; .slide-item { transform: scale(1); transition-duration: 1s; z-index: 1; position: relative; &.slide-active { transform: scale(1.3); z-index: 3; } } } } } .tt { padding: 20px; background: #fff; border: solid 5px #fff; box-shadow: 0px 0px 4px 1px rgba(0, 0, 0, 0.5); display: inline-block; vertical-align: middle; h2 { margin-top: 0; } img { float: left; width: 80px!important; margin: 10px; } }"],
                encapsulation: ViewEncapsulation.None
            },] },
];
/**
 * @nocollapse
 */
CarouselComponent.ctorParameters = function () { return [
    { type: ElementRef, },
]; };
CarouselComponent.propDecorators = {
    'compoArr': [{ type: Input },],
    'configOpt': [{ type: Input },],
    'slider': [{ type: ViewChild, args: ['slider',] },],
    'content': [{ type: ViewChild, args: ['content',] },],
    'slides': [{ type: ViewChild, args: ['slides',] },],
    'onResize': [{ type: HostListener, args: ['window:resize', ['$event'],] },],
};

var SampleModule = (function () {
    function SampleModule() {
    }
    /**
     * @return {?}
     */
    SampleModule.forRoot = function () {
        return {
            ngModule: SampleModule
        };
    };
    return SampleModule;
}());
SampleModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule
                ],
                declarations: [
                    CarouselComponent
                ],
                exports: [
                    CarouselComponent
                ]
            },] },
];
/**
 * @nocollapse
 */
SampleModule.ctorParameters = function () { return []; };

export { SampleModule, CarouselComponent };
