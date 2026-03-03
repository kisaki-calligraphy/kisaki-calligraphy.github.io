GALLERY_DIR := assets/gallery
OUTPUT_FILE := gallery.json
OUTPUT_JS := gallery.js
EVENTS_DIR := assets/events
EVENTS_OUTPUT_FILE := events.json
EVENTS_OUTPUT_JS := events.js

.PHONY: gallery events clean

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

events:
	@echo "Generating $(EVENTS_OUTPUT_FILE)..."
	@echo "[" > $(EVENTS_OUTPUT_FILE)
	@find $(EVENTS_DIR) -maxdepth 1 -type f \( -iname '*.jpg' -o -iname '*.jpeg' -o -iname '*.png' -o -iname '*.gif' -o -iname '*.webp' \) -printf '%f\n' | sort | sed 's/.*/  "&",/' >> $(EVENTS_OUTPUT_FILE)
	@sed -i '$$s/,$$//' $(EVENTS_OUTPUT_FILE)
	@echo "]" >> $(EVENTS_OUTPUT_FILE)
	@echo "window.EVENT_IMAGES = " > $(EVENTS_OUTPUT_JS)
	@cat $(EVENTS_OUTPUT_FILE) >> $(EVENTS_OUTPUT_JS)
	@echo ";" >> $(EVENTS_OUTPUT_JS)
	@echo "Done! Found $$(grep -c '"' $(EVENTS_OUTPUT_FILE)) images."

clean:
	@rm -f $(OUTPUT_FILE)
	@rm -f $(OUTPUT_JS)
	@rm -f $(EVENTS_OUTPUT_FILE)
	@rm -f $(EVENTS_OUTPUT_JS)
