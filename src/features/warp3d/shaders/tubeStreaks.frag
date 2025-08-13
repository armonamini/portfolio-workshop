precision highp float;
varying vec2 vUv;
uniform float u_time;

float band(float x, float w){ return smoothstep(0.5-w,0.5,x)-smoothstep(0.5,0.5+w,x); }

void main(){
  // mix multiple moving bands along Y for ribbed, high-speed look
  float s1 = band(fract(vUv.y*24.0 - u_time*8.0), 0.12);
  float s2 = band(fract(vUv.y*48.0 - u_time*12.0), 0.08);
  float s3 = band(fract(vUv.y*96.0 - u_time*16.0), 0.04);
  float energy = clamp(s1*1.2 + s2*1.0 + s3*0.8, 0.0, 2.0);

  // Much gentler radial darkening so tunnel walls are more visible
  float radial = smoothstep(1.0, 0.4, abs(vUv.x-0.5)*1.5);

  // Add subtle motion blur effect by sampling multiple time offsets
  float blur = 0.0;
  for(int i = 0; i < 3; i++) {
    float offset = float(i) * 0.02;
    float s1_blur = band(fract(vUv.y*24.0 - (u_time + offset)*8.0), 0.12);
    float s2_blur = band(fract(vUv.y*48.0 - (u_time + offset)*12.0), 0.08);
    float s3_blur = band(fract(vUv.y*96.0 - (u_time + offset)*16.0), 0.04);
    blur += (s1_blur*1.2 + s2_blur*1.0 + s3_blur*0.8) / 3.0;
  }
  energy = mix(energy, blur, 0.3);

  // Much more vibrant and visible colors
  vec3 darkColor = vec3(0.1, 0.0, 0.2);
  vec3 brightColor = vec3(6.0, 3.0, 7.0); // Extremely intense purple/magenta
  vec3 col = mix(darkColor, brightColor, energy) * radial;

  // Gentler vignette so tunnel walls are more visible
  float vignette = 1.0 - smoothstep(0.3, 0.9, length(vUv - 0.5) * 2.0);
  col *= vignette;

  gl_FragColor = vec4(col, radial);  // alpha helps overlay blend
} 