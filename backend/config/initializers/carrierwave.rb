CarrierWave.configure do |config|
	config.asset_host = "http://localhost:5000"
	config.storage = :file
	config.cache_storage = :file
end