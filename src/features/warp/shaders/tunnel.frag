precision highp float;

uniform float u_time;
uniform float u_speed;
uniform float u_intensity;
uniform vec2 u_resolution;
uniform float u_aspect;
uniform float u_flash;

varying vec2 vUv;

void main() {
    vec2 uv = vUv;
    
    // Polar coordinates for tunnel effect
    vec2 center = vec2(0.5, 0.5);
    vec2 polar = uv - center;
    float angle = atan(polar.y, polar.x);
    float radius = length(polar);
    
    // Tunnel movement
    float tunnel = radius + u_time * u_speed * 0.5;
    float tunnel_wrap = mod(tunnel, 0.1);
    
    // Streak effect
    float streak = sin(angle * 8.0 + u_time * 2.0) * 0.5 + 0.5;
    streak *= sin(radius * 20.0 - u_time * 3.0) * 0.5 + 0.5;
    
    // Intensity based on radius and time
    float intensity = (1.0 - radius) * u_intensity;
    intensity *= streak * tunnel_wrap * 2.0;
    
    // Purple color palette matching landing page
    vec3 color1 = vec3(0.5, 0.2, 0.8); // Purple
    vec3 color2 = vec3(0.8, 0.3, 1.0); // Light purple
    vec3 color3 = vec3(0.3, 0.1, 0.6); // Dark purple
    
    vec3 tunnel_color = mix(color1, color2, streak);
    tunnel_color = mix(tunnel_color, color3, radius);
    
    // Add white flash
    vec3 flash_color = vec3(1.0, 1.0, 1.0);
    tunnel_color = mix(tunnel_color, flash_color, u_flash);
    
    // Fade out at edges
    float fade = 1.0 - smoothstep(0.4, 0.5, radius);
    
    gl_FragColor = vec4(tunnel_color * intensity * fade, intensity * fade);
}
