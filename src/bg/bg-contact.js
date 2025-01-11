export default function bgContact() {
    let ROWS;
    let COLS;
    let NUM_PARTICLES = ( ( ROWS = 264 ) * ( COLS = 300 ) ),
        THICKNESS = Math.pow( 80, 2 ),
        SPACING = 3,
        MARGIN = 1,
        COLOR = 220,
        DRAG = 0.95,
        EASE = 0.25,
        container,
        particle,
        canvas,
        mouse,
        list,
        ctx,
        tog,
        man,
        dx, dy,
        mx, my,
        d, t, f,
        a, b,
        i, n,
        w, h,
        p, s,
        r, c
    ;

    particle = {
        vx: 0,
        vy: 0,
        x: 0,
        y: 0,
        c1: COLOR,
        c2: COLOR,
        c3: COLOR
    };

    function init() {
        console.log("resize");
        container = document.getElementById( 'container' );
        canvas = document.createElement( 'canvas' );
        let coords;
        coords = document.getElementById( 'coords' );
        ctx = canvas.getContext( '2d' );
        man = false;
        tog = true;

        list = [];

        SPACING = (window.innerWidth - MARGIN * 2) / COLS
        w = canvas.width = COLS * SPACING + MARGIN * 2;
        h = canvas.height = ROWS * SPACING + MARGIN * 2;
        container.style.marginLeft = Math.round( w * -0.5 ) + 'px';
        container.style.marginTop = Math.round( h * -0.5 ) + 'px';

        for ( i = 0; i < NUM_PARTICLES; i++ ) {

            p = Object.create( particle );
            p.x = p.ox = MARGIN + SPACING * ( i % COLS );
            p.y = p.oy = MARGIN + SPACING * Math.floor( i / COLS );

            list[i] = p;
        }

        container.addEventListener( 'mousemove', function(e) {

            let bounds;
            bounds = container.getBoundingClientRect();
            mx = e.clientX - bounds.left;
            my = e.clientY - bounds.top;
            man = true;

        });

        container.addEventListener( 'mouseout', function(e) {

            let bounds;
            bounds = container.getBoundingClientRect();
            mx = e.clientX - bounds.left;
            my = e.clientY - bounds.top;
            man = false;

        });

        container.appendChild( canvas );
    }

    function step() {




        if(tog){
            if ( !man ) {


                if(10 * Math.random()> 9){
                    t = +new Date() * 0.001;
                    mx = Math.floor(w * 0.5 + ( Math.cos( t )* w * 0.3));
                    my = Math.floor(h * 0.5 + ( Math.sin( t ) * h * 0.3));

                }


            }

            for ( i = 0; i < NUM_PARTICLES; i++ ) {

                p = list[i];

                d = ( dx = mx - p.x ) * dx + ( dy = my - p.y ) * dy;
                f = -THICKNESS / d;

                if ( d < THICKNESS ) {
                    t = Math.atan2( dy, dx );
                    p.vx += f * Math.cos(t);
                    p.vy += f * Math.sin(t);
                    p.c1 = 255; // color
                    p.c2 =0;
                    p.c3 = 0;
                }
                else{
                    p.c1 = p.c2 = p.c3 = 50;
                }
                if(p.vx > 10 ){
                    p.c2 =255;
                }
                if( p.vy > 10){
                    p.c3 = 255;
                }

                p.x += ( p.vx *= DRAG ) + (p.ox - p.x) * EASE;
                p.y += ( p.vy *= DRAG ) + (p.oy - p.y) * EASE;

            }
            tog = false;
        } else {

            b = ( a = ctx.createImageData( w, h ) ).data;

            for ( i = 0; i < NUM_PARTICLES; i++ ) {

                p = list[i];
                b[n = ( ~~p.x + ( ~~p.y * w ) ) * 4] = p.c1, b[n+1] = p.c2, b[n+2] = p.c3, b[n+3] = 255;
            }

            ctx.putImageData( a, 0, 0 );
            tog = true;
        }


        coords.innerHTML = `X=${Math.round(mx)} Y=${Math.round(my)}`;
        requestAnimationFrame( step );
    }



    init();
    step();

}