import {tuiToInt, tuiToRadians} from '@taiga-ui/cdk/utils/math';

const EMPTY = 'M 100 0 A 100 100 0 1 1 100 0 L 0 0';

/**
 * Describes a normalized sector by angles. Normalized meaning it supposed to work with
 * SVG with viewBox="-1 -1 2 2" so that 0 coordinates in cartesian and polar match the same spot.
 * Everything is multiplied by 100 (including viewBox of SVG to host this) so IE properly
 * handles hover events.
 *
 * @param startAngle starting angle in degrees
 * @param endAngle ending angle in degrees
 */
export function tuiDescribeSector(startAngle = 0, endAngle = 0): string {
    const startRad = tuiToRadians(startAngle);
    const endRad = tuiToRadians(endAngle);
    const startX = Math.cos(startRad) * 100;
    const startY = Math.sin(startRad) * 100;
    const endX = Math.cos(endRad) * 100;
    const endY = Math.sin(endRad) * 100;
    const largeArcFlag = tuiToInt(endAngle - startAngle > 180);
    const result = [
        'M',
        startX,
        startY,
        'A 100 100 0',
        largeArcFlag,
        1,
        endX,
        endY,
        'L 0 0',
    ];

    return Number.isNaN(endX) ? EMPTY : result.join(' ');
}
