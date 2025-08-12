varying vec2 vUv;
varying float vElevation;
varying vec3 vPosition;

uniform float u_time;
uniform float u_speed;

// Simple noise function
float noise(vec2 p) {
    return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
}

float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;
    float frequency = 1.0;
    
    for(int i = 0; i < 4; i++) {
        value += amplitude * noise(p * frequency);
        amplitude *= 0.5;
        frequency *= 2.0;
    }
    
    return value;
}

void main() {
    vUv = uv;
    vPosition = position;
    
    // Create displacement based on noise
    vec2 noiseCoord = uv * 3.0 + u_time * u_speed * 0.1;
    float elevation = fbm(noiseCoord) * 0.3;
    vElevation = elevation;
    
    // Displace vertices
    vec3 newPosition = position;
    newPosition.z += elevation;
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
}
