import { PartialType } from '@nestjs/mapped-types';
import { CreatePlaylistHasMusicDto } from './create-playlist-has-music.dto';

export class UpdatePlaylistHasMusicDto extends PartialType(CreatePlaylistHasMusicDto) {}
