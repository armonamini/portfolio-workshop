varying vec2 vUv;
varying float vElevation;
varying vec3 vPosition;

uniform float u_time;
uniform float u_speed;

void main() {
    // Base ocean blue color
    vec3 oceanBlue = vec3(0.074, 0.353, 0.541); // #125A8A
    
    // Add elevation-based color variation
    vec3 color = mix(oceanBlue, vec3(0.196, 0.455, 0.690), vElevation);
    
    // Add subtle emissive lines for wireframe effect
    float gridSize = 20.0;
    vec2 grid = fract(vUv * gridSize);
    float line = step(0.95, grid.x) + step(0.95, grid.y);
    
    // Animate the lines
    float lineIntensity = line * (0.3 + 0.2 * sin(u_time * 2.0 + vUv.x * 10.0));
    
    // Add glow effect
    vec3 glowColor = vec3(0.549, 0.776, 0.918); // #8BC6EA
    color = mix(color, glowColor, lineIntensity);
    
    // Add atmospheric fog
    float fog = smoothstep(0.0, 0.5, vUv.y);
    color = mix(color, vec3(0.196, 0.455, 0.690), fog * 0.3);
    
    // Add horizon glow
    float horizon = smoothstep(0.4, 0.6, vUv.y);
    vec3 horizonColor = vec3(0.314, 0.663, 0.863); // #4FA9DC
    color = mix(color, horizonColor, horizon * 0.2);
    
    gl_FragColor = vec4(color, 1.0);
}
