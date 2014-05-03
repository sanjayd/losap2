# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20140503204655) do

  create_table "members", force: true do |t|
    t.string   "firstname"
    t.string   "lastname"
    t.string   "badgeno"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "members", ["badgeno"], name: "index_members_on_badgeno"
  add_index "members", ["firstname"], name: "index_members_on_firstname"
  add_index "members", ["lastname"], name: "index_members_on_lastname"

  create_table "station_times", force: true do |t|
    t.string   "type"
    t.integer  "member_id"
    t.date     "date"
    t.float    "hours"
    t.boolean  "deleted"
    t.datetime "start_time"
    t.datetime "end_time"
    t.string   "unit"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "station_times", ["date"], name: "index_station_times_on_date"
  add_index "station_times", ["member_id"], name: "index_station_times_on_member_id"
  add_index "station_times", ["type"], name: "index_station_times_on_type"

end
