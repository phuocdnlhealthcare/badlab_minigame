export interface ElementMotion {
    x: number;
    y: number;
    scale: number;
}

export function getElementMotion(
    source: HTMLElement,
    target: HTMLElement
): ElementMotion {
    const sourceRect =
        source.getBoundingClientRect();

    const targetRect =
        target.getBoundingClientRect();

    const sourceCenterX =
        sourceRect.left +
        sourceRect.width / 2;

    const sourceCenterY =
        sourceRect.top +
        sourceRect.height / 2;

    const targetCenterX =
        targetRect.left +
        targetRect.width / 2;

    const targetCenterY =
        targetRect.top +
        targetRect.height / 2;

    const x =
        sourceCenterX - targetCenterX;

    const y =
        sourceCenterY - targetCenterY;

    const scale =
        targetRect.width > 0
            ? sourceRect.width /
            targetRect.width
            : 1;

    return {
        x,
        y,
        scale,
    };
}