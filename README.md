# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...

## groups_usersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user

## usersテーブル

|Column|Type|Options|
|------|----|-------|
|group_id|integer|null: false, foreign_key: true|
|email|string|null: false, foreign_key: true|
|encrypted-password|string|null: false, foreign_key: true|


### Association
- has_many : groups_users
- has_many : groups, through: :groups_users

## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|

### Association
- has_many : groups_users
- has_many : users, through: :groups_users

## messageテーブル

|Column|Type|Options|
|------|----|-------|
|body|text|null: false, foreign_key: true|
|image|string|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
|user_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user

