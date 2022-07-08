describe("empty spec", () => {
  it("passes", () => {
    const elem = document.createElement("div");
    elem.style.width = "100px";
    elem.style.height = "100px";
    elem.style.backgroundColor = "red";
    elem.style.position = "absolute";
    elem.style.left = "0px";
    elem.style.top = "0px";
    document.body.appendChild(elem);

    expect(elem.clientWidth).to.equal(100);
  });
});
