json.array! @messages do |message|
	json.user_name message.user.name
	json.date message.created_at.strftime("%Y年%m月%d日 %H時%M分")
	json.content message.content
	json.image message.image.url
	json.id message.id
end