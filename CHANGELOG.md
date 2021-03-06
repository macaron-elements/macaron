# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [0.5.0](https://github.com/macaron-elements/macaron/compare/v0.4.2...v0.5.0) (2022-07-04)


### Bug Fixes

* **editor:** better new component position ([50f5504](https://github.com/macaron-elements/macaron/commit/50f55044ff4337de171f831718fcc49742a526e1))
* **editor:** fix captureDOM for <slot> elements ([1584b9d](https://github.com/macaron-elements/macaron/commit/1584b9de03028c42638d46ba42c46b83c3790ca6))
* **editor:** render nothing for recursive instances (fix [#130](https://github.com/macaron-elements/macaron/issues/130)) ([531223d](https://github.com/macaron-elements/macaron/commit/531223dbd26f6d444d8c1f5f3fb7d5d2c81f980e))
* **figma:** export better CSS from Figma ([#134](https://github.com/macaron-elements/macaron/issues/134)) ([79b7a9a](https://github.com/macaron-elements/macaron/commit/79b7a9ab4fa076aae298f60ad2202946a9426bca))


### Features

* **editor:** improve copy/paste  ([#129](https://github.com/macaron-elements/macaron/issues/129)) ([0e687f6](https://github.com/macaron-elements/macaron/commit/0e687f63e4e44c7a8232a1ae927ca8c698cbb5c6))
* **editor:** insert dropped elements to better position ([#132](https://github.com/macaron-elements/macaron/issues/132)) ([24c9285](https://github.com/macaron-elements/macaron/commit/24c9285af41a706d9de9bd84fc571c4cce3d9a0c))





## [0.4.2](https://github.com/macaron-elements/macaron/compare/v0.4.1...v0.4.2) (2022-06-29)


### Bug Fixes

* **editor:** fix quadtree-ts is not imported correctly ([37e0bfa](https://github.com/macaron-elements/macaron/commit/37e0bfacc0e46f1d212b3826ebded6e86d7d7b6e))





## [0.4.1](https://github.com/macaron-elements/macaron/compare/v0.4.0...v0.4.1) (2022-06-29)


### Bug Fixes

* **editor:** disable quirks mode of renderer iframe (fix [#69](https://github.com/macaron-elements/macaron/issues/69)) ([e208594](https://github.com/macaron-elements/macaron/commit/e2085942cb2cabc5d99549345fd8f40b44aa0b88))
* **editor:** set display to block when creating new components ([ca3bfe8](https://github.com/macaron-elements/macaron/commit/ca3bfe81c74b7a698aaa20a74f0444463ff6157d))


### Features

* **editor:** activate media query variants in component instances based on variant artboard width ([#119](https://github.com/macaron-elements/macaron/issues/119)) ([4d0b762](https://github.com/macaron-elements/macaron/commit/4d0b762a1bd7962683be4a993ffa45e671f974ed))
* **editor:** copy & paste styles ([#121](https://github.com/macaron-elements/macaron/issues/121)) ([4c20634](https://github.com/macaron-elements/macaron/commit/4c206349550a3d021f597aa53d5f02169da04f13))
* **editor:** do not append wrapper elements to components created from elements ([#122](https://github.com/macaron-elements/macaron/issues/122)) ([3ea2105](https://github.com/macaron-elements/macaron/commit/3ea21057aaf3bc7cf687d6873dc948f17458fa39))
* **editor:** implement eye dropper (fix [#114](https://github.com/macaron-elements/macaron/issues/114)) ([8adc6e4](https://github.com/macaron-elements/macaron/commit/8adc6e45775fd15e88d9a469d28d350a51fd0bed))
* **editor:** Implement Select All ([#126](https://github.com/macaron-elements/macaron/issues/126)) ([1778a80](https://github.com/macaron-elements/macaron/commit/1778a804b630aa214531c417892fa09f804f13b5))





# [0.4.0](https://github.com/macaron-elements/macaron/compare/v0.3.1...v0.4.0) (2022-06-26)

### Bug Fixes

- **editor:** fix command+scroll and pinch direction ([fb30f30](https://github.com/macaron-elements/macaron/commit/fb30f30820fc808f0eb05e2ddcf47a78387db043))
- remove vw/vh unit from dropdown (fix [#108](https://github.com/macaron-elements/macaron/issues/108)) ([34bd287](https://github.com/macaron-elements/macaron/commit/34bd287b9e3811c128488912da3d62fb60d9872d))

### Features

- **editor:** icons in cursor select options (fix [#116](https://github.com/macaron-elements/macaron/issues/116)) ([09d5927](https://github.com/macaron-elements/macaron/commit/09d5927d3068c827f1e55bc93c1f5180a7d529aa))
- **editor:** insert tool shortcuts + send more analytics ([#117](https://github.com/macaron-elements/macaron/issues/117)) ([a707db9](https://github.com/macaron-elements/macaron/commit/a707db95e5daaf65fa149692655fedb518443a70))

## [0.3.1](https://github.com/macaron-elements/macaron/compare/v0.3.0...v0.3.1) (2022-06-22)

**Note:** Version bump only for package macaron

# [0.3.0](https://github.com/macaron-elements/macaron/compare/v0.2.0...v0.3.0) (2022-06-22)

### Bug Fixes

- **editor:** support pasting HTML with invalid IDs ([a931be9](https://github.com/macaron-elements/macaron/commit/a931be928212e992eabe1b0a094e0c27a9efe0b4))
- **figma:** better ID generation for non-ascii layer names ([87d9e3c](https://github.com/macaron-elements/macaron/commit/87d9e3c86ae9be16aae0c90c632409ad7a191fdf))

### Features

- webpack loader ([#99](https://github.com/macaron-elements/macaron/issues/99)) ([c04d398](https://github.com/macaron-elements/macaron/commit/c04d398841a8522500fac4f3bb19226e5fad6476))

# [0.2.0](https://github.com/macaron-elements/macaron/compare/v0.1.1...v0.2.0) (2022-06-22)

### Bug Fixes

- **editor:** fix image asset not shown in Windows ([#95](https://github.com/macaron-elements/macaron/issues/95)) ([38646e9](https://github.com/macaron-elements/macaron/commit/38646e906104f706415da9f6ac7b3550bad971b9))
- **editor:** hide unnecessary scroll bars on iframe ([fb283af](https://github.com/macaron-elements/macaron/commit/fb283af6aaf8921e5dab2295cd6192ca3050f367))
- **editor:** round computed bounding boxes to fixed precision ([0484088](https://github.com/macaron-elements/macaron/commit/04840880a38df13da9df10cf32361656a48d019d))
- **vscode:** improve extension init/deinit ([4defaac](https://github.com/macaron-elements/macaron/commit/4defaac284f429f09445d3d1c962551a03b22f7b))

### Features

- **editor:** add anonymous feedback button ([177a658](https://github.com/macaron-elements/macaron/commit/177a65851134986f3edc2dbe807f90391974365e))
- **editor:** image add tool ([26f8bc4](https://github.com/macaron-elements/macaron/commit/26f8bc4772dedc30ebef4b1fbb662540496b41ed))
- **editor:** image input with better support for data URLs ([#93](https://github.com/macaron-elements/macaron/issues/93)) ([fe5e652](https://github.com/macaron-elements/macaron/commit/fe5e652148596f4517a493e6dde144b79c31fb04))
- **editor:** more tag name options ([2062c40](https://github.com/macaron-elements/macaron/commit/2062c40f768b7049d08264f58abb2a1bb48dc432))
- **editor:** set root element' position to relative by default (fix [#75](https://github.com/macaron-elements/macaron/issues/75)) ([2d60e98](https://github.com/macaron-elements/macaron/commit/2d60e983199206a98b4e2e3e8c2bdaae1f8c4825))
- **editor:** show scroll bars ([#64](https://github.com/macaron-elements/macaron/issues/64)) ([114ed2e](https://github.com/macaron-elements/macaron/commit/114ed2eb291d3e4f87d66252e2d627bb18292c9e))
- **figma:** better Figma plugin UI (built with Macaron) ([#71](https://github.com/macaron-elements/macaron/issues/71)) ([73bc3f6](https://github.com/macaron-elements/macaron/commit/73bc3f6f9782c4f19f2dc9611b255ed82c414aba))

### Reverts

- Revert "chore(deps): pin dependencies (#76)" (#89) ([6ae1fa5](https://github.com/macaron-elements/macaron/commit/6ae1fa51bcca9ef101f9784b6752cab0a3e90827)), closes [#76](https://github.com/macaron-elements/macaron/issues/76) [#89](https://github.com/macaron-elements/macaron/issues/89)
