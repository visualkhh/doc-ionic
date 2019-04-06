import {AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';

export class PolygonGraphData {
    data: number[];
    max: number;
    // getMax(): number {
    //     if (undefined === this.max) {
    //         for (let i = 0; this.data && i < this.data.length; i++) {
    //
    //         }
    //     }
    // }
}

@Component({
    selector: 'app-polygon-graph',
    templateUrl: './polygon-graph.component.html',
    styleUrls: ['./polygon-graph.component.scss'],
})

export class PolygonGraphComponent implements OnInit, AfterViewInit, OnChanges {
    private _width: number;
    private _height: number;
    private _padding = 5;
    private _data: PolygonGraphData;
    private _polygonLength = 1;
    @Input()
    public polygonLineStrokeStyle = '#969696';
    public polygonDataFillStyle = 'rgba(71, 169, 203, 0.5)';
    @Input()
    public set polygonLength(value: number) {
        this._polygonLength = value;
        // this.reDraw();
    }

    @Input()
    public set padding(value: number) {
        this._padding = value;
        // this.reDraw();
    }

    @Input()
    public set data(value: PolygonGraphData) {
        this._data = value;
        // this.reDraw();
    }
    @Input()
    public set width(value: number) {
        this._width = value;
        // this.reDraw();
    }

    @Input()
    public set height(value: number) {
        this._height = value;
        // this.reDraw();
    }

    public get polygonLength(): number {
        return this._polygonLength;
        // this.reDraw();
    }

    public get padding(): number {
        return this._padding;
    }

    public get width(): number {
        return this._width;
    }

    public get height(): number {
        return this._height;
    }

    public get data(): PolygonGraphData {
        return this._data;
    }

    @ViewChild('canvas') public canvasElementRef: ElementRef;

    constructor() {
    }

    ngOnChanges(changes: SimpleChanges) {
        this.reDraw();
    }
    ngOnInit() {
        this.reDraw();
    }

    ngAfterViewInit() {
        this.reDraw();
    }

    private reDraw() {
        // console.log(event.target);
        const canvas = this.canvasElementRef.nativeElement as HTMLCanvasElement;
        const ctx = canvas.getContext('2d');
        // ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (!this.data || !this.data.data || this.data.data.length < 3) {
            return;
        }

        // console.log(this.canvasContainerElementRef.nativeElement.clientWidth);
        // return;
        // canvas.height = canvas.width = Math.max(this.canvasContainerElementRef.nativeElement.clientWidth - 5, 0);
        canvas.width = Math.max(this.width - 5, 0)
        canvas.height = Math.max(this.height - 5, 0)
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const startAngle = -Math.PI / 2;
        const sides = this.data.data.length;
        const radius = (centerX) - this.padding;
        const jumpRadius = (radius) / this.polygonLength;


        this.polygonLine(ctx, centerX, centerY, radius, sides, startAngle);
        for (let i = 1; i <= this.polygonLength; i++) {
            this.polygon(ctx, centerX, centerY, jumpRadius * i, sides, startAngle);
        }
        this.polygonData(ctx, centerX, centerY, this.data, radius,  startAngle);
        // ctx.beginPath();
        // ctx.arc(canvas.width / 2, canvas.height / 2, 50, 0, 2 * Math.PI);
        // ctx.stroke();
        // ctx.beginPath(); //경로 그리기 시작
        // ctx.moveTo(canvas.width / 2, canvas.height / 2); //기준 좌표값 이동
        // context.translate(x, y);
        // ctx.lineTo(100,100); // X, Y 좌표를 사용하여 선 그리기
        // ctx.lineTo(200,100); // X, Y 좌표를 사용하여 선 그리기
        // ctx.fill(); //경로 그리기 종료(채움)
        // ctx.beginPath(); //경로 그리기 시작
        // ctx.moveTo(50, 50); //기준 좌표값 이동
        // ctx.lineTo(200,50); // X, Y 좌표를 사용하여 선 그리기
        // ctx.lineTo(50,200);
        // ctx.fill(); //경로 그리기 종료(채움)
    }

    private polygonData(ctx: CanvasRenderingContext2D, x: number, y: number, data: PolygonGraphData, radius: number, startAngle: number) {
        const sides = data.data.length;
        if (sides < 3) {
            return;
        } // 3각형 이하는 그리지 않도록 한다.
        // A:B = C:X    => 30:50 = 33 : x
        // 30X = 50*33
        // X = BC / 30

        // max:radius = val:?
        // max*? = radius*val
        // ? = radius*val / max;
        const degree = (Math.PI * 2) / sides; // 각 면에 대한 각도를 계산한다.
        ctx.save(); // 드로잉 상태를 저정한다.
        ctx.strokeStyle = this.polygonDataFillStyle;
        ctx.fillStyle = this.polygonDataFillStyle;
        ctx.beginPath(); // 경로 그리기 시작
        ctx.translate(x, y); // 드로잉 좌표 공간을 다각형 중심좌표로 이동한다. context.rotate(startAngle); //시작 각도를 중심으로 그리도록 하기 위하여 회전한다. context.moveTo(radius, 0); //다각형의 시작 위치로 이동한다.
        ctx.rotate(startAngle); // 시작 각도를 중심으로 그리도록 하기 위하여 회전한다.
        ctx.moveTo((radius * data.data[0]) / data.max, 0); // 다각형의 시작 위치로 이동한다.
        // ctx.lineTo(0, 0);
        for (let i = 1; i < sides; i++) {// 면의수만큼루프를반복한다
            // 다음 꼭지점까지 선을 그린다.
            const setRedius = (radius * data.data[i]) / data.max;
            console.log(setRedius);
            const sx = setRedius * Math.cos(degree * i);
            const sy = setRedius * Math.sin(degree * i);
            ctx.lineTo(sx, sy);
        }
        ctx.fill();
        ctx.closePath(); // 패스를 닫는다. context.restore(); //기존 드로잉 상태를 복구한다.
        ctx.stroke();
        ctx.restore(); // 기존 드로잉 상태를 복구한다.
    }

    private polygon(ctx: CanvasRenderingContext2D, x: number, y: number, radius: number, sides: number, startAngle: number) {
        if (sides < 3) {
            return;
        } // 3각형 이하는 그리지 않도록 한다.
        const degree = (Math.PI * 2) / sides; // 각 면에 대한 각도를 계산한다.
        ctx.save(); // 드로잉 상태를 저정한다.
        ctx.strokeStyle = this.polygonLineStrokeStyle;
        ctx.beginPath(); // 경로 그리기 시작
        ctx.translate(x, y); // 드로잉 좌표 공간을 다각형 중심좌표로 이동한다. context.rotate(startAngle); //시작 각도를 중심으로 그리도록 하기 위하여 회전한다. context.moveTo(radius, 0); //다각형의 시작 위치로 이동한다.
        ctx.rotate(startAngle); // 시작 각도를 중심으로 그리도록 하기 위하여 회전한다.
        ctx.moveTo(radius, 0); // 다각형의 시작 위치로 이동한다.
        // ctx.lineTo(0, 0);
        for (let i = 1; i < sides; i++) {// 면의수만큼루프를반복한다
            // 다음 꼭지점까지 선을 그린다.
            const sx = radius * Math.cos(degree * i);
            const sy = radius * Math.sin(degree * i);
            ctx.lineTo(sx, sy);
        }
        // ctx.fill();
        ctx.closePath(); // 패스를 닫는다. context.restore(); //기존 드로잉 상태를 복구한다.
        ctx.stroke();


        // ctx.beginPath(); // 경
        // ctx.arc(radius, 0, 50, 0, 2 * Math.PI);
        // ctx.stroke();
        // for (let i = 1; i < sides; i++) {// 면의수만큼루프를반복한다
        //     // 다음 꼭지점까지 선을 그린다.
        //     ctx.beginPath(); // 경
        //     const sx = radius * Math.cos(degree * i);
        //     const sy = radius * Math.sin(degree * i)
        //     ctx.arc(sx, sy, 50, 0, 2 * Math.PI);
        //     ctx.closePath();
        //     ctx.stroke();
        // }
        ctx.restore(); // 기존 드로잉 상태를 복구한다.
    }

    private polygonLine(ctx: CanvasRenderingContext2D, x: number, y: number, radius: number, sides: number, startAngle: number) {
        if (sides < 3) {
            return;
        } // 3각형 이하는 그리지 않도록 한다.
        const degree = (Math.PI * 2) / sides; // 각 면에 대한 각도를 계산한다.
        ctx.save(); // 드로잉 상태를 저정한다.
        ctx.strokeStyle = this.polygonLineStrokeStyle;
        ctx.translate(x, y); // 드로잉 좌표 공간을 다각형 중심좌표로 이동한다. context.rotate(startAngle); //시작 각도를 중심으로 그리도록 하기 위하여 회전한다. context.moveTo(radius, 0); //다각형의 시작 위치로 이동한다.
        ctx.rotate(startAngle); // 시작 각도를 중심으로 그리도록 하기 위하여 회전한다.
        ctx.beginPath(); // 경로 그리기 시작


        ctx.moveTo(radius, 0); // 다각형의 시작 위치로 이동한다.
        ctx.lineTo(0, 0);
        // ctx.lineTo(100, 20);
        // ctx.closePath();
        ctx.stroke();
        // ctx.closePath();

        for (let i = 1; i < sides; i++) {// 면의수만큼루프를반복한다
            // 다음 꼭지점까지 선을 그린다.
            // ctx.beginPath(); // 경
            const sx = radius * Math.cos(degree * i);
            const sy = radius * Math.sin(degree * i);
            ctx.moveTo(sx, sy); // 다각형의 시작 위치로 이동한다.
            ctx.lineTo(0, 0);
            // ctx.closePath();
            ctx.stroke();
        }
        ctx.restore(); // 기존 드로잉 상태를 복구한다.
    }
}
