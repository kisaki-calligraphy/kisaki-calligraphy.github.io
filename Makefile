GALLERY_DIR := assets/gallery
OUTPUT_FILE := gallery.json
OUTPUT_JS := gallery.js

.PHONY: gallery clean

gallery:
	@echo "Generating $(OUTPUT_FILE)..."
	@echo "[" > $(OUTPUT_FILE)
	@find $(GALLERY_DIR) -maxdepth 1 -type f \( -iname '*.jpg' -o -iname '*.jpeg' -o -iname '*.png' -o -iname '*.gif' -o -iname '*.webp' \) -printf '%f\n' | sort | sed 's/.*/  "&",/' >> $(OUTPUT_FILE)
	@sed -i '$$s/,$$//' $(OUTPUT_FILE)
	@echo "]" >> $(OUTPUT_FILE)
	@echo "window.GALLERY_IMAGES = " > $(OUTPUT_JS)
	@cat $(OUTPUT_FILE) >> $(OUTPUT_JS)
	@echo ";" >> $(OUTPUT_JS)
	@echo "Done! Found $$(grep -c '"' $(OUTPUT_FILE)) images."

clean:
	@rm -f $(OUTPUT_FILE)
	@rm -f $(OUTPUT_JS)
