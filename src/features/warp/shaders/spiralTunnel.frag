precision highp float;
uniform float u_time;          // seconds
uniform float u_progress;      // 0..1
uniform vec2  u_resolution;    // px

varying vec2 vUv;

float sat(float x){ return clamp(x,0.,1.); }
vec3 palette(float t){
  // deep purple -> magenta -> hot pink -> white
  vec3 a = vec3(0.07,0.00,0.15);
  vec3 b = vec3(0.70,0.10,0.75);
  vec3 c = vec3(1.00,0.40,0.90);
  return mix(mix(a,b,sat(t*1.2)), c, sat(t*0.6));
}

void main(){
  vec2 uv = (gl_FragCoord.xy - 0.5*u_resolution) / u_resolution.y;
  float t = u_time;

  float r = length(uv);
  float a = atan(uv.y, uv.x);

  // progress → accelerated zoom
  float z = smoothstep(0.0, 1.0, u_progress);       // ease
  r = r / (1.0 - 0.85*z + 1e-3);

  // spiral twist (log term creates ribbing perspective)
  a += 6.0*log(r + 1e-3) + 2.5*t;

  // angular beads & radial ribs
  float ang = 0.5 + 0.5*cos(24.0*a + 8.0*t);
  float rad = 0.5 + 0.5*cos(60.0*r - 18.0*t);
  float bands = pow(sat(ang*rad), 1.2);

  float depth  = pow(1.0 - sat(r), 3.0);
  float flash  = smoothstep(0.65,0.72,u_progress) * (1.0 - smoothstep(0.72,0.85,u_progress));

  float energy = sat(bands*1.2 + depth*0.8);
  vec3 col = palette(energy);
  col += flash*1.2;

  // slight aberration along tangent (desktop post can add more)
  float fall = 0.8 / (0.35 + r*r*1.5);
  vec3 rgb = sat(col) * fall;

  gl_FragColor = vec4(rgb, sat(energy + flash));
} 