import { classNames } from "./classNames"

describe("classNames", ()=>{
    test("with only first param", () => {
        expect(classNames("someClass")).toBe("someClass")
    });

    test("with additional class", () => {
        const expected = "someClass class1 class2"
        expect(classNames("someClass", {}, ["class1", "class2"])).toBe(expected)
    });

    test("with modes", () => {
        const expected = "someClass class1 class2 hovered scrolable"
        expect(classNames("someClass", {hovered: true, scrolable: true}, ["class1", "class2"])).toBe(expected)
    });

    test("with modes false", () => {
        const expected = "someClass class1 class2 hovered"
        expect(classNames("someClass", {hovered: true, scrolable: false}, ["class1", "class2"])).toBe(expected)
    });

    test("with modes undefined", () => {
        const expected = "someClass class1 class2 hovered"
        expect(classNames("someClass", {hovered: true, scrolable: undefined}, ["class1", "class2"])).toBe(expected)
    });
}) 